import { createAction, props } from "@ngrx/store";

export interface LoginFailPayload {
    readonly error: boolean;
}

export const loginFail = createAction(
    '[Authentication] Login Failed',
    props<{ readonly payload: LoginFailPayload }>()
);

export const logout = createAction(
    '[Authentication] Logout',
)

export const logoutSuccess = createAction(
    '[Authentication] Logout Success',
)

export const logoutFailed = createAction(
    '[Authentication] Logout Failed',
)

export const loginErrorClear = createAction(
    '[Authentication] Login State Clear',
)

export type LoginAction =
    | typeof loginFail
    | typeof logout
    | typeof logoutSuccess
    | typeof logoutFailed
    | typeof loginErrorClear;
