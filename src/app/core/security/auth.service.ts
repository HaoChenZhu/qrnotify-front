/* import { Injectable } from '@angular/core';
import OktaAuth, { TokenResponse } from '@okta/okta-auth-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private oktaAuth: OktaAuth;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.oktaAuth = new OktaAuth({
      issuer: 'https://dev-86838266.okta.com/oauth2/default',
      clientId: '0oa9frlofozHCx0Am5d7',
      redirectUri: window.location.origin + '/callback',
      pkce: true,

    });
  }

  getOktaAuth(): OktaAuth {
    return this.oktaAuth;
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.oktaAuth.isAuthenticated();
  }

  async getUser(): Promise<any> {
    return await this.oktaAuth.getUser();
  }

  async getToken(): Promise<string | undefined> {
    const accessToken = await this.oktaAuth.getAccessToken();
    return accessToken;
  }

  async login(): Promise<void> {
    await this.oktaAuth.signInWithRedirect();
  }

  async logout(): Promise<void> {
    await this.oktaAuth.signOut();
  }
  async handleAuthentication(queryParams: string): Promise<void> {
    const tokenResponse: TokenResponse = await this.oktaAuth.token.parseFromUrl(queryParams);
    await this.oktaAuth.tokenManager.setTokens(tokenResponse.tokens);
  }
}
 */