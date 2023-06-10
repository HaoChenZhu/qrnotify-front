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
import { TopicComponent } from './components/topic/topic.component';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { EnvService } from './core/environment/env.service';
import { TurnComponent } from './components/topic/turn/turn.component';
import { JwtModule } from '@auth0/angular-jwt';
export const oktaConfig: any = {
  issuer: 'https://dev-86838266.okta.com/oauth2/default',
  clientId: '0oa9gmfbgfJUiFXEG5d7',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
};

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: '',
  port: 8084,
  path: '/mqtt',
  protocol: 'wss',
  username: '',
  password: '',
};

const disallowedRoutes = ['/login', '/login/callback', '/qrcode'];
const allowedRoutes = ['http://localhost:4200/topic', '/public', '/dashboard'];
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
    TopicComponent,
    TurnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    QRCodeModule,
    HttpClientModule,
    OktaAuthModule.forRoot({ oktaAuth }),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: allowedRoutes,
        disallowedRoutes: disallowedRoutes,
      },
    }),
  ],
  providers: [
    FormsModule,
    { provide: OktaAuth, useValue: oktaAuth },
    { provide: HTTP_INTERCEPTORS, useClass: HttpUserInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCustomInterceptor,
      multi: true,
    },
    EnvServiceProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private env: EnvService) {
    const mqttBroker = this.env ? this.env.mqttBroker : undefined; // Verificar si env está definido
    const issuer = this.env ? this.env.oktaDomain : undefined; // Valor predeterminado para issuer si no está definido
    const clientId = this.env ? this.env.oktaClientId : undefined; // Valor predeterminado para clientId si no está definido
    const port = this.env ? this.env.mqttPort : undefined; // Verificar si env está definido
    const username = this.env ? this.env.mqttUser : undefined; // Verificar si env está definido
    const password = this.env ? this.env.mqttPassword : undefined; // Verificar si env está definido
    const callback = window.location.origin + '/login/callback';

    if (mqttBroker && port && username && password) {
      MQTT_SERVICE_OPTIONS.hostname = mqttBroker;
      MQTT_SERVICE_OPTIONS.port = Number(port);
      MQTT_SERVICE_OPTIONS.username = username;
      MQTT_SERVICE_OPTIONS.password = password;
    }

    if (issuer && clientId && callback) {
      oktaConfig.issuer = issuer;
      oktaConfig.clientId = clientId;
      oktaConfig.redirectUri = callback;
    }
  }
}
