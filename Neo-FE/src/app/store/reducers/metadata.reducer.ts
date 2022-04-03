import { createReducer, on } from "@ngrx/store";
import { MetaData } from "src/app/dto";
import { Nullable, StateSlice } from "../../model/state-slice";

import * as metadataActions from '../actions';

export interface MetadataState extends StateSlice<Nullable<MetaData>> { }

export const initialState: MetadataState = {
    data: null,
    loaded: false,
    loading: false,
    error: null
};

const metadataReducer = createReducer(
    initialState,
    on(metadataActions.getWidget, (state, { }) => ({
        ...state,
        loading: true
    })),

    on(metadataActions.getMetadataSuccess, (state, { payload }) =>
    ({
        ...state,
        data: {
            ...payload
        },
        loading: false,
        loaded: true
    })),

    on(metadataActions.getMetadataFail, (state, { payload }) =>
    ({
        ...state,
        loading: false,
        loaded: true,
        error: { error: payload.error }
    })
    )
);

export function reducer(
    state = initialState,
    action: metadataActions.MetadataAction
): MetadataState {
    return metadataReducer(state, action);
}