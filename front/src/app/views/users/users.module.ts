import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {SharedModule} from "../../shared/shared-module/shared.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {ReactiveStateModule} from "../../reactive-state/reactive-state.module";


@NgModule({
  declarations: [
    UsersComponent
  ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        SharedModule,
        MatGridListModule,
        ReactiveStateModule
    ]
})
export class UsersModule { }
