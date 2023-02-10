import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StateListComponent} from "./components/state-list/state-list.component";

const routes: Routes = [
  { path: 'state', component: StateListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveStateRoutingModule { }
