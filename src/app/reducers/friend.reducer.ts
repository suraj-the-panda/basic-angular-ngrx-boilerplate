import { Friend } from "../models/friend.model";
import { Action } from "@ngrx/store";

export const ADD_FRIEND = "ADD_FRIEND";

export function addFriendReducer(state: Friend[] = [], action) {
  switch (action.type) {
    case ADD_FRIEND:
      return [...state, action.payload];
    default:
      return state;
  }
}
