import { createReducer, on } from "@ngrx/store";
import { HistoryList } from "src/app/dto";
import { Nullable, StateSlice } from "../../model/state-slice";

import * as historyActions from '../actions';

export interface HistoryState extends StateSlice<Nullable<HistoryList>> { }

export const initialState: HistoryState = {
    data: {},
    loaded: false,
    loading: false,
    error: null
};

const historyReducer = createReducer(
    initialState,
    on(historyActions.getHistory, (state, { payload }) => ({
        ...state,
        loading: true
    })),

    on(historyActions.getHistorySuccess, (state, { payload }) =>
    ({
        ...state,
        data: {
            ...payload,
            history: JSON.parse(payload.history?.toString() || '[]').history
        },
        loading: false,
        loaded: true
    })),

    on(historyActions.getHistoryFail, (state, { payload }) =>
    ({
        ...state,
        loading: false,
        loaded: true,
        error: payload.error
    })
    ),

    on(historyActions.deleteAuthTokenSuccess, _ => ({
        ...initialState
    })),
);

export function reducer(
    state = initialState,
    action: historyActions.HistoryAction
): HistoryState {
    return historyReducer(state, action);
}