import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromDashboard from './dashboard.reducer';
import * as fromHistory from './history.reducer';
import * as fromMetadata from './metadata.reducer';

export interface NeoState {
  readonly login: fromAuth.LoginState;
  readonly dashboard: fromDashboard.DashboardState;
  readonly history: fromHistory.HistoryState;
  readonly metadata: fromMetadata.MetadataState;
}

export const NEO_FEATURE = 'neo';

export interface NeoStateSlice {
  readonly [NEO_FEATURE]: NeoState;
}

export const neoReducers: ActionReducerMap<NeoState, any> = {
  login: fromAuth.reducer,
  dashboard: fromDashboard.reducer,
  history: fromHistory.reducer,
  metadata: fromMetadata.reducer
};
