import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { Store } from "@ngrx/store";
import { Friend } from "../../models/friend.model";
import { AppState } from "../../app.state";
import { FriendsServiceService } from "../../services/friends-service.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs";
@Component({
  selector: "app-add-friend",
  templateUrl: "./add-friend.component.html",
  styleUrls: ["./add-friend.component.css"],
})
export class AddFriendComponent implements OnInit {
  friendsFromStore: any;
  thisForm: FormGroup;
  constructor(
    private store: Store<AppState>,
    private friendService: FriendsServiceService
  ) {
    this.friendsFromStore = this.store.select((state) => state.friends);
    store
      .select((state) => state.friends)
      .subscribe((res) => {
        this.friendsFromStore = res;
      });
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  friends = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our friend
    if ((value || "").trim()) {
      this.friends.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(friend): void {
    const index = this.friends.indexOf(friend);
    if (index >= 0) {
      this.friends.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.thisForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      friends: new FormControl([], []),
      age: new FormControl("", [Validators.required]),
      weight: new FormControl("", [Validators.required]),
    });
  }

  submit() {
    if (this.thisForm.valid) {
      if (this.friends.length) {
        let x = [];
        this.friends.forEach((temp) => {
          x.push(temp.name);
        });
        this.thisForm.controls.friends.setValue([...x]);
      } else {
        return false;
      }
      this.store.dispatch({
        type: "ADD_FRIEND",
        payload: <Friend>{
          id: this.friendsFromStore.length + 1,
          ...this.thisForm.value,
          isSuccess: true,
        },
      });
      this.thisForm.reset();
      this.friends = [];
    } else {
      this.friendService.setTouched(this.thisForm);
    }
  }
}
