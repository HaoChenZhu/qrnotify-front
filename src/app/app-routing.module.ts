import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [OktaAuthGuard] },
  { path: 'qrcode', component: QrcodeComponent, canActivate: [OktaAuthGuard] },
  { path: 'login/callback', component: OktaCallbackComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
