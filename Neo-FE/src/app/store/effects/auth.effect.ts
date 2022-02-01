import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { AuthClientService } from "src/app/services/auth-client.service";
import { NeoStateSlice } from "../reducers";

import * as a from '../actions';
import { TokenStorageService } from "src/app/services/token-storage.service";
import { catchError, mergeMap, switchMap, take, tap, throwError } from "rxjs";
import { hasTokenRequestFailed, UserTokenFail } from "src/app/dto";
import { Router } from "@angular/router";
import { catchMap } from "src/app/model/catch-map";
import { SocialAuthService } from "angularx-social-login";

@Injectable()
export class AuthEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly authClient: AuthClientService,
        private readonly tokenStorage: TokenStorageService,
        private readonly router: Router,
        private readonly socialAuthService: SocialAuthService
    ) { }

    authToken$ = createEffect(() =>
        this.actions$.pipe(
            ofType(a.createAuthToken),
            tap(() => {
                this.tokenStorage.removeAll();
            }),
            switchMap(action =>
                this.authClient.login(action.payload).pipe(
                    take(1),
                    switchMap((response) => {
                        if (hasTokenRequestFailed(response)) {
                            return throwError({ auth: response.isAuth });
                        }

                        this.tokenStorage.persistAuthToken(response);
                        return [a.createAuthTokenSuccess({ payload: response })]
                    }),
                    catchError((error: UserTokenFail) => [
                        a.createAuthTokenFail({ payload: { error: error.isAuth } }),
                    ])
                ))
        )
    );

    onLogout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(a.logout),
            mergeMap(() => [a.deleteAuthToken()]
            )
        )
    );

    onDeleteAuthToken$ = createEffect(() =>
        this.actions$.pipe(
            ofType(a.deleteAuthToken),
            tap(() => {
                this.tokenStorage.removeAll();
                this.socialAuthService.signOut();
                this.router.navigate(['/signin']).catch(e => {
                    console.error(e);
                });
            }),
            switchMap(() => [a.deleteAuthTokenSuccess(), a.logoutSuccess()]),
            catchMap<Action, { error: boolean }>(error => a.deleteAuthTokenFail(error))
        )
    );

}