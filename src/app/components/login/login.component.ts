import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import OktaAuth from '@okta/okta-auth-js';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/security/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  subscription: Subscription | undefined;
  modal: boolean = false;
  data: any;

  user = {
    name: '',
    phone: ''
  };
  constructor(
    private _commonService: CommonService,
    private _loginService: LoginService,
    private oktaAuth: OktaAuth
  ) { }
  ngOnInit(): void {
    this.subscription = this._loginService.actionModal$.subscribe((item) => {
      this.modal = item;
      if (this.modal) {
        console.log('open modal');
      }
    })
  }

  onSubmit(loginForm: NgForm) {
    console.log(this.oktaAuth.getAccessToken());
    this.getData();
    console.log(loginForm.value);
    this._loginService.telephone = loginForm.value.phone;
    this._loginService.changeAction(true);
    this._loginService.openVerificationModal('Login', 'Are you sure you want to login?', 'Login')
    loginForm.reset();
  }

  getData(): void {
    this._loginService.getSomeData().subscribe(data => {
      console.log('Datos obtenidos:', data); // imprime los datos recuperados en la consola
      this.data = data;
    }, (error: any) => {
      console.error(error);
    });
  }
  async getAccessToken() {
    const accessToken = await this.oktaAuth.getAccessToken;
    console.log('Access Token:', accessToken);
  }


}
