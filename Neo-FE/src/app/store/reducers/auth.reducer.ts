import { createReducer, on } from "@ngrx/store";
import { AuthTokenUser } from "src/app/dto"
import { Nullable, StateSlice } from "../../model/state-slice"

import * as authActions from '../actions';

export interface LoginState extends StateSlice<Nullable<AuthTokenUser>> { }

export const initialState: LoginState = {
    data: null,
    loaded: false,
    loading: false,
    error: null
};

const authReducer = createReducer(
    initialState,
    on(authActions.createAuthToken, _ => ({
        ...initialState,
        loading: true
    })),

    on(authActions.createAuthTokenSuccess, (state, { payload }) => ({
        ...state,
        data: payload,
        loading: false,
        loaded: true
    })),

    on(authActions.createAuthTokenFail, (state, { payload: { error } }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { error }
    })),

    on(authActions.deleteAuthToken, (state, { }) => ({
        ...state,
        loading: true,
        loaded: false
    })),

    on(authActions.deleteAuthTokenSuccess, _ => ({
        ...initialState
    })),

    on(authActions.deleteAuthTokenFail, (state, { error }) => ({
        ...initialState,
        error: { error }
    }))
);

export function reducer(
    state = initialState,
    action: authActions.AuthTokenAction
): LoginState {
    return authReducer(state, action);
}