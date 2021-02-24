import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FriendsServiceService {
  constructor() {}

  get(key) {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    } else return null;
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key) {
    localStorage.removeItem(key);
  }

  setTouched(form) {
    Object.keys(form.controls).forEach((key) => {
      form.controls[key].markAsTouched({ onlySelf: true });
    });
  }
}
