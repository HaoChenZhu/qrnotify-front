import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnvService } from '../core/environment/env.service';
import { IUserDto } from '../models/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  title = 'commonTitle';
  description = 'commonDesc';
  option = 'optionDesc';
  telephone = '';
  name = '';
  private clientId = 'clientId';
  private tokenKey = 'token';
  private _actionModal = new BehaviorSubject<boolean>(false);
  private readonly USER_URL =
    this.env.apiRestDomain + this.env.adminContext + '/user';
  private readonly LOGIN_URL =
    this.env.apiRestDomain + this.env.adminContext + '/login';
  private readonly VERIFY_URL =
    this.env.apiRestDomain + this.env.adminContext + '/verify';

  actionModal$ = this._actionModal.asObservable();

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private jwtHelper: JwtHelperService
  ) {}

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
    if (modal) {
      modal.classList.toggle('hidden');
    }
  }

  changeAction(action: boolean) {
    this._actionModal.next(action);
  }

  login(name: string, phone_number: string) {
    const body = {
      name: name,
      phone_number: phone_number,
    };
    return this.http.post<IUserDto>(this.LOGIN_URL, body);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    const isExpired = this.jwtHelper.isTokenExpired(token);

    console.log(isExpired);
    return !isExpired;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.clientId);
  }

  setClientId(id: any): void {
    localStorage.setItem(this.clientId, id);
  }

  getClientId() {
    return localStorage.getItem(this.clientId);
  }

  verify(name: string, phone_number: string, code: string) {
    const body = {
      name: name,
      phone_number: phone_number,
      code: code,
    };
    return this.http.post<IUserDto>(this.VERIFY_URL, body);
  }

  getClientByPhone(number: string) {
    return this.http.get<IUserDto>(this.USER_URL + '/phone/' + this.telephone);
  }
}
