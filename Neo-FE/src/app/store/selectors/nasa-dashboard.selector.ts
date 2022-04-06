import { createSelector } from '@ngrx/store';
import { NasaWidgetProperty } from 'src/app/dto';
import { Map } from 'immutable';
import { getNeoState } from './dashboard.selector';

export const getNasaDashboardState = createSelector(getNeoState, ({ nasaDashboard }) => nasaDashboard);

export const getNasaDashboardLoading = createSelector(
  getNasaDashboardState,
  ({ loading }) => loading
);

export const getNasaDashboardError = createSelector(
  getNasaDashboardState,
  ({ error }) => error
);

export const nasaWidgetsList = createSelector(
  getNasaDashboardState,
  ({ data }) =>
    data?.widgets.map(widget => ({ ...widget, gridster: JSON.parse(JSON.stringify(widget.gridster)) }))
);

export const nasaWidgetsListById = createSelector(
  getNasaDashboardState,
  ({ data }) =>
    Map<number, NasaWidgetProperty>(
      data?.widgets.map(widget => [widget.id, widget]) || []
    )
);

export const getNasaNextId = createSelector(
  getNasaDashboardState,
  ({ data }) => (data?.id || 0) + 1
);
