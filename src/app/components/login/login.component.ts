import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import OktaAuth from '@okta/okta-auth-js';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserDto } from 'src/app/models/user.interface';
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
  name: string = '';
  phone: string = '';
  nameError: boolean = false;
  phoneError: boolean = false;
  literals: any;
  constructor(
    private _loginService: LoginService,
    private router: Router,
    private _commonService: CommonService
  ) { }
  ngOnInit(): void {
    this.literals = this._commonService.getLiterals();
    if (this._loginService.isTokenValid()) { // si el token no ha expirado redirigir a topic
      this.router.navigate(['/topic']);
    }

  }

  onSubmit(loginForm: NgForm) {
    this.nameError = false;
    this.phoneError = false;

    if (loginForm.controls['name'].invalid && loginForm.controls['name'].touched) {
      if (loginForm.controls['name'].errors?.['required']) {
        this.nameError = true;
      } else if (loginForm.controls['name'].errors?.['minlength']) {
        this.nameError = true;
      }
    }

    if (loginForm.controls['phone'].invalid && loginForm.controls['phone'].touched) {
      if (loginForm.controls['phone'].errors?.['required']) {
        this.phoneError = true;
      } else if (loginForm.controls['phone'].errors?.['minlength']) {
        this.phoneError = true;
      }
    }

    if (loginForm.invalid) {
      return;
    }

    this._loginService.login(loginForm.value.name, loginForm.value.phone).subscribe({
      next: (user: IUserDto) => {
        this._loginService.telephone = user.phone_number || '';
        this._loginService.name = user.name || '';
      },
      error: (error) => {
        alert("Ha ocurrido un error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.");
      },
      complete: () => {
        this._loginService.openVerificationModal('Verification code', 'Introduce el codigo de verificación', 'Enter')
        loginForm.reset();
      }
    });
  }

}
