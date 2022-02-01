import { Injectable } from '@angular/core';
import { Nullable } from '../model/state-slice';
import { AuthTokenUser } from '../dto/auth';

enum TokenType {
  Auth = 'AUTH',
  Refresh = 'REFRESH',
  CSRF = 'CSRF'
}

export interface CSRFToken {
  readonly csrf: string;
}

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
  private readonly storage = window.localStorage;
  private readonly KEY = 'neo:application:token';

  constructor() {}

  getAuthToken(): Nullable<AuthTokenUser> {
    return this.getToken(TokenType.Auth) as AuthTokenUser;
  }

  persistAuthToken(token: AuthTokenUser) {
    this.persist(token, TokenType.Auth);
  }

  removeAuthToken() {
    this.storage.removeItem(this.storageKey(TokenType.Auth));
  }

  getCSRFToken(): Nullable<CSRFToken> {
    return this.getToken(TokenType.CSRF) as CSRFToken;
  }

  persistCSRFToken(token: CSRFToken) {
    this.persist(token, TokenType.CSRF);
  }

  removeCSRFToken() {
    this.storage.removeItem(this.storageKey(TokenType.CSRF));
  }

  removeAll() {
    this.removeAuthToken();
    this.removeCSRFToken();
  }

  private persist(
    token:
      | AuthTokenUser
      | CSRFToken,
    type: TokenType,
  ) {
    const encoded = JSON.stringify(token);
    this.storage.setItem(this.storageKey(type), encoded);
  }

  private getToken(
    type: TokenType
  ): Nullable<
    | AuthTokenUser
    | CSRFToken
  > {
    const token = this.storage.getItem(this.storageKey(type));
    try {
      return token && JSON.parse(token);
    } catch {
      return null;
    }
  }

  private storageKey(type: TokenType) {
    return `${this.KEY}__${type}`;
  }
}
