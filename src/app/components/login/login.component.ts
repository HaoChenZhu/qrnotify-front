import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
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

  user = {
    name: '',
    phone: ''
  };
  constructor(
    private _commonService: CommonService,
    private _loginService: LoginService
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
    console.log(loginForm.value);
    this._loginService.telephone = loginForm.value.phone;
    this._loginService.changeAction(true);
    this._loginService.openVerificationModal('Login', 'Are you sure you want to login?', 'Login')
    loginForm.reset();
  }
}
