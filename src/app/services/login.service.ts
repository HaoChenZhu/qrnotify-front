import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnvService } from '../core/environment/env.service';

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
  private readonly ADMIN_URL = this.env.apiRestDomain + this.env.adminContext + '/admin'

  // Observable modal action
  actionModal$ = this._actionModal.asObservable();

  constructor(private http: HttpClient, private env: EnvService,) { }


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
    console.log(this.ADMIN_URL)
    return this.http.get<any>(this.ADMIN_URL);
  }
}
