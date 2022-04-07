import { createReducer, on } from "@ngrx/store";
import { Nullable, StateSlice } from "../../model/state-slice";

import * as mapdataActions from '../actions';

export interface MapdataState extends StateSlice<Nullable<Object>> { }

export const initialState: MapdataState = {
    data: null,
    loaded: false,
    loading: false,
    error: null
};

const mapdataReducer = createReducer(
    initialState,
    on(mapdataActions.getMapdata, (state, { }) => ({
        ...state,
        loading: true
    })),

    on(mapdataActions.getMapdataSuccess, (state, { payload }) =>
    ({
        ...state,
        data: payload,
        loading: false,
        loaded: true
    }))
);

export function reducer(
    state = initialState,
    action: mapdataActions.MetadataAction
): MapdataState {
    return mapdataReducer(state, action);
}