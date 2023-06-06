import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { AdminComponent } from './components/login/admin/admin.component';
import { TopicComponent } from './components/topic/topic.component';
import { TurnComponent } from './components/topic/turn/turn.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'qrcode', component: QrcodeComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'admin', component: AdminComponent, canActivate: [OktaAuthGuard] },
  { path: 'topic', component: TopicComponent },
  { path: 'turn/:id', component: TurnComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
