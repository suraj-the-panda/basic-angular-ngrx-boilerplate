import { I } from "@angular/cdk/keycodes";
import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { Friend } from "../../models/friend.model";
import { AppState } from "../../app.state";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit, AfterViewInit, OnChanges {
  friends: Observable<Friend[]>;
  friendsForGraph: any;
  constructor(private store: Store<AppState>) {
    this.friends = this.store.select((state) => state.friends);
    store
      .select((state) => state.friends)
      .subscribe((res) => {
        this.friendsForGraph = res;
      });
  }

  displayedColumns: string[] = ["id", "name", "friends", "age", "weight"];
  dataSource: any;
  ngOnInit(): void {}
  ngOnChanges(changes) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {}
}
