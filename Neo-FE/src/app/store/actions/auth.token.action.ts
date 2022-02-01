import { createAction, props } from "@ngrx/store";
import { LoginFailPayload } from ".";
import { AuthArgs, AuthTokenUser } from "../../dto";

export const createAuthToken = createAction(
  '[Authentication] Create Auth Token',
  props<{ readonly payload: AuthArgs }>()
);


export const createAuthTokenSuccess = createAction(
  '[Authentication] Create Auth Token Success',
  props<{ payload: AuthTokenUser }>()
);

export const createAuthTokenFail = createAction(
  '[Authentication] Create Auth Token Fail',
  props<{ readonly payload: LoginFailPayload }>()
);

export const deleteAuthToken = createAction(
  '[Authentication] Delete Auth Token'
);

export const deleteAuthTokenSuccess = createAction(
  '[Authentication] Load Delete Auth Token Success'
);

export const deleteAuthTokenFail = createAction(
  '[Authentication] Load Delete Auth Token Fail',
  props<{ readonly error: boolean }>()
);

export type AuthTokenAction =
  | typeof createAuthToken
  | typeof createAuthTokenSuccess
  | typeof createAuthTokenFail
  | typeof deleteAuthToken
  | typeof deleteAuthTokenSuccess
  | typeof deleteAuthTokenFail;