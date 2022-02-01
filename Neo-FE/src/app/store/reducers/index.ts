import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromDashboard from './dashboard.reducer';

export interface NeoState {
  readonly login: fromAuth.LoginState;
  readonly dashboard: fromDashboard.DashboardState;
}

export const NEO_FEATURE = 'neo';

export interface NeoStateSlice {
  readonly [NEO_FEATURE]: NeoState;
}

export const neoReducers: ActionReducerMap<NeoState, any> = {
  login: fromAuth.reducer,
  dashboard: fromDashboard.reducer
};
