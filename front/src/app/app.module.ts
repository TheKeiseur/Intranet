import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthInterceptor} from "./utils/AuthInterceptor";
import {SharedModule} from "./shared/shared-module/shared.module";
import {HeaderComponent} from "./shared/header/header.component";
import {JwtModule} from "@auth0/angular-jwt";

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
  ],
  providers: [
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
