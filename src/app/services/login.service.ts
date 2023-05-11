import { HttpClient } from '@angular/common/http';
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
  private _actionModal = new BehaviorSubject<boolean>(false);
  private url = "http://localhost:8081/nebrija/qrnotify-admin/user"

  // Observable modal action
  actionModal$ = this._actionModal.asObservable();

  constructor(private http: HttpClient) { }


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
  getSomeData() {
    return this.http.get(this.url);
  }
}
