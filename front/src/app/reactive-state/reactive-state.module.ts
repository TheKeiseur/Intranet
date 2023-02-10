import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateListComponent } from './components/state-list/state-list.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {ReactiveStateRoutingModule} from "./reactive-state-routing.module";
import {StateService} from "./services/state.service";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatGridListModule} from "@angular/material/grid-list";
import {SharedModule} from "../shared/shared-module/shared.module";



@NgModule({
  declarations: [
    StateListComponent
  ],
  exports: [
    StateListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    ReactiveStateRoutingModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatGridListModule,
    SharedModule
  ],
  providers: [
    StateService
  ]
})
export class ReactiveStateModule { }
