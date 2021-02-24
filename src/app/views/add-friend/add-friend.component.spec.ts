import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { AddFriendComponent } from "./add-friend.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

describe("AddFriendComponent", () => {
  let component: AddFriendComponent;
  let fixture: ComponentFixture<AddFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddFriendComponent],
      imports: [ReactiveFormsModule, FormsModule, StoreModule.forRoot({})],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFriendComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("form invalid when empty", () => {
    expect(component.thisForm.valid).toBeFalsy();
  });

  it("name field validity", () => {
    let name = component.thisForm.controls["name"];
    expect(name.valid).toBeFalsy();

    let errors = {};
    name.setValue("");
    errors = name.errors || {};
    expect(errors["required"]).toBeTruthy();
  });
  it("age field validity", () => {
    let age = component.thisForm.controls["age"];
    expect(age.valid).toBeFalsy();

    let errors = {};
    age.setValue(null);
    errors = age.errors || {};
    expect(errors["required"]).toBeTruthy();
  });
  it("weight field validity", () => {
    let weight = component.thisForm.controls["weight"];
    expect(weight.valid).toBeFalsy();

    let errors = {};
    weight.setValue("");
    errors = weight.errors || {};
    expect(errors["required"]).toBeTruthy();
  });
  it("should call submit() method on form submit", () => {
    /*Get button from html*/
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    // Supply id of your form below formID
    const getForm = fixture.debugElement.query(By.css("#formID"));
    expect(getForm.triggerEventHandler("submit", compiled)).toBeUndefined();
  });
});
