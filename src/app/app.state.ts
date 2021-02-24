// app.state.ts

import { Friend } from "./models/friend.model";

export interface AppState {
  readonly friends: Friend[];
}
