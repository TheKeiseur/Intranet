import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./views/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./views/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'user/create',
    loadChildren: () => import('./views/create/create.module').then(m => m.CreateModule)
  },
  {
    path: 'user/:id/edit',
    loadChildren: () => import('./views/edit/edit.module').then(m => m.EditModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
