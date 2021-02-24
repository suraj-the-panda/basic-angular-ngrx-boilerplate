import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { FriendsServiceService } from "./services/friends-service.service";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AddFriendComponent } from "./views/add-friend/add-friend.component";

import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { ListComponent } from "./views/list/list.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { FriendsComponent } from "./views/friends/friends.component";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";

import { StoreModule } from "@ngrx/store";
import { addFriendReducer } from "./reducers/friend.reducer";
import { StatsComponent } from './views/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    AddFriendComponent,
    ListComponent,
    FriendsComponent,
    StatsComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ friends: addFriendReducer }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [FriendsServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
