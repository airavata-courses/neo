import { createSelector } from '@ngrx/store';
import { getNeoState } from '.';

export const getMapdataState = createSelector(getNeoState, ({ mapData }) => mapData);

export const getMapdataLoading = createSelector(
    getMapdataState,
    ({ loading }) => loading
);

export const getMapData = createSelector(
    getMapdataState,
    ({data}) => data
);
