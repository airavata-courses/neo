import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WidgetProperty } from 'src/app/dto';
import { NEO_FEATURE, NeoState } from '../reducers';
import { Map } from 'immutable';

export const getNeoState = createFeatureSelector<NeoState>(NEO_FEATURE);

export const getDashboardState = createSelector(getNeoState, ({ dashboard }) => dashboard);

export const getDashboardLoading = createSelector(
  getDashboardState,
  ({ loading }) => loading
);

export const widgetsList = createSelector(
  getDashboardState,
  ({ data }) =>
    data?.widgets.map(widget => ({ ...widget, gridster: JSON.parse(JSON.stringify(widget.gridster)) }))
);

export const widgetsListById = createSelector(
  getDashboardState,
  ({ data }) =>
    Map<number, WidgetProperty>(
      data?.widgets.map(widget => [widget.id, widget]) || []
    )
);

export const getNextId = createSelector(
  getDashboardState,
  ({ data }) => (data?.id || 0) + 1
)