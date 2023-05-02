import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  title = 'commonTitle';
  description = 'commonDesc';
  option = 'optionDesc';
  telephone = {}

  constructor() { }
  private _actionModal = new BehaviorSubject<boolean>(false);
  // Observable modal action
  actionModal$ = this._actionModal.asObservable();

  openVerificationModal(title: string, description?: string, option?: string) {
    this.title = title;

    if (description) {
      this.description = description;
    } else {
      this.description = '';
    }

    if (option) {
      this.option = option;
    } else {
      this.option = '';
    }

    let modal = document.getElementById('modalVerification') as HTMLElement;
    if (modal) { modal.classList.toggle('hidden'); }
  }

  changeAction(action: boolean) {
    this._actionModal.next(action);
  }

}
