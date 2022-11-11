import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticatorInterceptor } from './interceptor/authenticator.interceptor';
import { CovidsummaryComponent } from './components/covidsummary/covidsummary.component';
import { SharedModule } from './shared/shared.module';
import { CountrychartComponent } from './components/countrychart/countrychart.component';

@NgModule({
  declarations: [
    AppComponent,
    CountrychartComponent,
    CovidsummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticatorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
