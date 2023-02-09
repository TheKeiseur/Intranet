import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthInterceptor} from "./utils/AuthInterceptor";
import {SharedModule} from "./shared/shared-module/shared.module";
import {HeaderComponent} from "./shared/header/header.component";
import {JwtModule} from "@auth0/angular-jwt";
import {MatMomentDateModule} from "@angular/material-moment-adapter";

export function tokenGetter() {
  return localStorage.getItem("id_token");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["*"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMomentDateModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
