import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NEO_FEATURE, NeoState } from '../reducers';

export const getAuthState = createFeatureSelector<NeoState>(NEO_FEATURE);

export const getAuthLogin = createSelector(getAuthState, ({ login }) => login);

export const getAuthLoginLoading = createSelector(
  getAuthLogin,
  ({ loading }) => loading
);

export const getAuthSuccess = createSelector(
  getAuthLogin,
  ({ data, error }) => Boolean(data?.accessToken) && !error
);

export const getLoginErrors = createSelector(
  getAuthLogin,
  ({ error }) => error
);

export const getTokenUserEmail = createSelector(
  getAuthLogin,
  ({ data }) => data?.email
);

export const getIsAuthenticated = createSelector(
  getAuthLogin,
  ({ data }) => !!data && data.isAuth
);