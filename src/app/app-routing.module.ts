import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'qrcode', component: QrcodeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
