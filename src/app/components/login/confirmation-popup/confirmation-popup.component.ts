import { Component, OnInit } from '@angular/core';
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
  constructor(private _commonService: CommonService, private _loginService: LoginService) { }
  ngOnInit(): void {
    this.check();
    this.resetFailedAttempts();
  }
  close() {
    this._loginService.changeAction(false);
    let modal = document.getElementById('modalVerification') as HTMLElement;
    modal.classList.toggle('hidden');
  }

  onSubmit(form: any) {
    let telephone = this._loginService.telephone;
    console.log(telephone + form.value.verificationCode);
    // Validar el código de verificación aquí y enviarlo al servidor si es válido
    const isValid = (this.verificationCode === '123456'); // Solo para fines de demostración

    if (isValid) {
      // Cerrar el modal y redirigir al usuario a la página de inicio
      // Agregar la lógica para redirigir al usuario a la página de inicio aquí
    } else {
      this.failedAttempts++;
      if (this.failedAttempts >= 3) {
        // Si se han realizado 3 intentos fallidos, mostrar un mensaje y cerrar el modal
        this._commonService.openModal('Demasiados intentos fallidos', 'Ha realizado demasiados intentos fallidos. Por favor, inténtelo de nuevo más tarde.');
        let modal = document.getElementById('modalVerification') as HTMLElement;
        modal.classList.toggle('hidden');
        form.reset();
      } else {
        let description = 'El código de verificación es incorrecto. Por favor, inténtelo de nuevo. (Intentos fallidos: ' + this.failedAttempts + ' de 3 intentos)';
        this._loginService.description = description;
        form.reset();
      }
    }
  }

  check() {
    this.title = this._loginService.title;
    this.description = this._loginService.description;
    this.option = this._loginService.option;
    return true;
  }
  resetFailedAttempts() {
    this.failedAttempts = 0;
  }
}