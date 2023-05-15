import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import OktaAuth from '@okta/okta-auth-js';
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
        console.log(user)
        // Aquí puedes manejar la respuesta de la API si es necesario.
        // Por ejemplo, podrías mostrar un mensaje de que el código de confirmación ha sido enviado.
        this._loginService.telephone = user.phone_number || '';
        this._loginService.name = user.name || '';
      },
      error: (error) => {
        // Aquí puedes manejar los errores que puedan ocurrir al iniciar sesión.
        alert("Ha ocurrido un error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.");
      },
      complete: () => {
        this._loginService.openVerificationModal('Login', 'Are you sure you want to login?', 'Login')
        loginForm.reset();
      }
    });
  }

}
