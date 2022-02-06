import { createSelector } from '@ngrx/store';
import { getNeoState } from '.';

export const getHistoryState = createSelector(getNeoState, ({ history }) => history);

export const getHistoryLoading = createSelector(
    getHistoryState,
    ({ loading }) => loading
);

export const getHistoryList = createSelector(
    getHistoryState,
    ({ data }) =>
        data?.history
);

export const getCurrentPage = createSelector(
    getHistoryState,
    ({ data }) =>
        (data?.currentPage || 1) - 1
);

export const getDataLength = createSelector(
    getHistoryState,
    ({ data }) =>
        (data?.totalPages || 1) * 10
);

export const getHistoryError = createSelector(
    getHistoryState,
    ({ data }) => data?.isAuth
);