import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCardComponent} from "../user-card/user-card.component";
import {UserFormComponent} from "../user-form/user-form.component";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {UserBadgeComponent} from "../user-card/user-badge/user-badge.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    UserCardComponent,
    UserFormComponent,
    UserBadgeComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterModule
  ],
  exports: [
    UserCardComponent,
    UserFormComponent,
    UserBadgeComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class SharedModule {
}
