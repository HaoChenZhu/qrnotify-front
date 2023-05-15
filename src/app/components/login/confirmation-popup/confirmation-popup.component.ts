import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css']
})
export class ConfirmationPopupComponent implements OnInit {
  title: string = '';
  description: string = '';
  option: string = '';
  verificationCode: string = '';
  failedAttempts: number = 0;
  constructor(private router: Router, private _commonService: CommonService, private _loginService: LoginService) { }
  ngOnInit(): void {
    this.check();
    this.resetFailedAttempts();
  }
  close() {
    this._loginService.changeAction(false);
    let modal = document.getElementById('modalVerification') as HTMLElement;
    modal.classList.toggle('hidden');
  }

  onSubmit(form: NgForm) {
    let telephone = this._loginService.telephone;
    let name = this._loginService.name;
    console.log(telephone + form.value.verificationCode);
    // Validar el código de verificación aquí y enviarlo al servidor si es válido
    this._loginService.verify(name, telephone, form.value.verificationCode).subscribe({
      next: (user: any) => {
        localStorage.setItem('token', user.token);
        let modal = document.getElementById('modalVerification') as HTMLElement;
        modal.classList.toggle('hidden');
        form.reset();
        this.router.navigate(['/qrcode']);
      },
      error: (error) => {
        if (this.failedAttempts === 0) {
          // Si se han realizado 3 intentos fallidos, mostrar un mensaje y cerrar el modal
          this._commonService.openModal('Demasiados intentos fallidos', 'Ha realizado demasiados intentos fallidos. Por favor, inténtelo de nuevo más tarde.');
          let modal = document.getElementById('modalVerification') as HTMLElement;
          modal.classList.toggle('hidden');
          this.resetFailedAttempts();
          form.reset();
        } else {
          let description = 'El código de verificación es incorrecto. Por favor, inténtelo de nuevo. (Intentos restantes: ' + this.failedAttempts + ')';
          this.failedAttempts--;
          this._loginService.description = description;
          form.reset();
        }
      }
    }) // Solo para fines de demostración
  }

  check() {
    this.title = this._loginService.title;
    this.description = this._loginService.description;
    this.option = this._loginService.option;
    return true;
  }
  resetFailedAttempts() {
    this.failedAttempts = 3;
  }
}
