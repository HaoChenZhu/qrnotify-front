import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnvService } from '../core/environment/env.service';
import { IUserDto } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  title = 'commonTitle';
  description = 'commonDesc';
  option = 'optionDesc';
  telephone = '';
  name = '';
  private _actionModal = new BehaviorSubject<boolean>(false);
  private readonly USER_URL = this.env.apiRestDomain + this.env.adminContext + '/user'
  private readonly LOGIN_URL = this.env.apiRestDomain + this.env.adminContext + '/login'
  private readonly VERIFY_URL = this.env.apiRestDomain + this.env.adminContext + '/user/verify'

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

  login(name: string, phone_number: string) {
    const body = {
      'name': name,
      'phone_number': phone_number
    };
    console.log(body)
    return this.http.post<IUserDto>(this.LOGIN_URL, body);
  }

  verify(name: string, phone_number: string, code: string) {
    const body = {
      'name': name,
      'phone_number': phone_number,
      'code': code
    };
    console.log(body)
    return this.http.post<IUserDto>(this.VERIFY_URL, body);
  }

}
