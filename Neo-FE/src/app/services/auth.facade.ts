import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { AuthArgs } from '../dto/auth';
import { Nullable } from '../model/state-slice';
import { neoActions as a, neoQuery as s, NeoStateSlice } from '../store';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthFacade {
  constructor(
    private readonly store: Store<NeoStateSlice>,
    private readonly jwtHelper: JwtHelperService,
    private readonly tokenStorage: TokenStorageService
  ) { }

  readonly isLoginLoading$ = this.store.select(s.getAuthLoginLoading);
  readonly isAuthTokenSuccess$ = this.store.select(s.getAuthSuccess);
  readonly isAuthenticated$ = this.store.select(s.getIsAuthenticated);
  readonly getLoginErrors$ = this.store.select(s.getLoginErrors);
  readonly getAuthData$ = this.store.select(s.getAuthLogin);

  login({
    tokenId
  }: AuthArgs) {
    this.store.dispatch(
      a.createAuthToken({
        payload: {
          tokenId
        }
      })
    );
  }

  logout() {
    this.store.dispatch(a.logout());
  }

  attemptLoginFromSessionStorage() {
    const accessToken = this.tokenStorage.getAuthToken();
    if (accessToken && this.isTokenValid(accessToken.accessToken)) {
      this.store.dispatch(
        a.createAuthTokenSuccess({
          payload: accessToken
        })
      );
    }
    else {
      a.createAuthTokenFail({
        payload: { error: true }
      });
    }
  }

  persistCSRFToken(csrf: string) {
    this.tokenStorage.persistCSRFToken({ csrf });
  }

  getCSRFToken() {
    return this.tokenStorage.getCSRFToken();
  }

  removeCSRFToken() {
    this.tokenStorage.removeCSRFToken();
  }

  loginErrorClear() {
    this.store.dispatch(a.loginErrorClear());
  }

  private isTokenValid(token?: Nullable<string>): boolean {
    return !this.jwtHelper.isTokenExpired(token as string);
  }
}
