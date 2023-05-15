import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ConfirmationPopupComponent } from './components/login/confirmation-popup/confirmation-popup.component';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from './components/shared/popup/popup.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component';
import { QRCodeModule } from 'angularx-qrcode';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpCustomInterceptor } from './core/http/http-custom-interceptor';
import { CallbackComponent } from './components/callback/callback.component';
import { OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { EnvServiceProvider } from './core/environment/env.service.provider';
import { AdminComponent } from './components/login/admin/admin.component';
import { HttpUserInterceptor } from './core/http/http-user-interceptor';

const oktaConfig = {
  issuer: 'https://dev-86838266.okta.com/oauth2/default',
  clientId: '0oa9gmfbgfJUiFXEG5d7',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};
const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    ConfirmationPopupComponent,
    PopupComponent,
    QrcodeComponent,
    CallbackComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    QRCodeModule,
    HttpClientModule,
    OktaAuthModule.forRoot({ oktaAuth })
  ],
  providers: [
    FormsModule,
    { provide: OktaAuth, useValue: oktaAuth },
    { provide: HTTP_INTERCEPTORS, useClass: HttpUserInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpCustomInterceptor, multi: true },
    EnvServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
