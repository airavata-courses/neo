import { createReducer, on } from "@ngrx/store";
import { NasaResult, NasaWidgetsList } from "src/app/dto"
import { Nullable, StateSlice } from "../../model/state-slice"

import * as nasaDashboardActions from '../actions';

export interface NasaDashboardState extends StateSlice<Nullable<NasaWidgetsList>> { }

export const initialState: NasaDashboardState = {
    data: {
        widgets: [],
        id: 0
    },
    loaded: false,
    loading: false,
    error: null
};

const nasaDashboardReducer = createReducer(
    initialState,
    on(nasaDashboardActions.getNasaWidget, (state, { payload }) => {
        const indexOfData = (state.data?.widgets || []).findIndex((widget) => (widget.id === payload.id));
        if (indexOfData >= 0) {
            let updatedData = [...state.data?.widgets || []]
            updatedData[indexOfData] = {
                ...updatedData[indexOfData],
                isLoading: true,
                date: payload.date,
                feature: payload.feature
            }
            return {
                ...state,
                data: {
                    id: state.data?.id || 0,
                    widgets: updatedData
                },
                loading: true,
                loaded: false
            };
        }
        return {
            ...state,
            data: {
                widgets: [...(state.data?.widgets || []), { ...payload, id: (state.data?.id || 0) + 1, isLoading: true }],
                id: (state.data?.id || 0) + 1
            },
            loading: true
        }
    }),

    on(nasaDashboardActions.getNasaWidgetSuccess, (state, { payload }) => {
        const indexOfData = (state.data?.widgets || []).findIndex((widget) => (widget.id === payload.widgetId));
        let updatedData = [...state.data?.widgets || []]
        updatedData[indexOfData] = {
            ...updatedData[indexOfData],
            isLoading: false,
            ack: payload.ack,
            result: payload.data_output_value && payload.data_output_value !== -1? JSON.parse((payload.data_output_value as unknown as string).slice(2,-1)) as NasaResult : undefined
        }

        return {
            ...state,
            data: {
                id: state.data?.id || 0,
                widgets: updatedData
            },
            loading: false,
            loaded: true
        };
    }),

    on(nasaDashboardActions.getNasaWidgetFail, (state, { payload }) => {
        const indexOfData = (state.data?.widgets || []).findIndex((widget) => (widget.id === payload.widgetId));
        let updatedData = [...state.data?.widgets || []]
        updatedData[indexOfData] = {
            ...updatedData[indexOfData],
            isLoading: false,
            failed: true
        }

        return {
            ...state,
            data: {
                id: state.data?.id || 0,
                widgets: updatedData
            },
            loading: false,
            loaded: false,
        }
    }),

    on(nasaDashboardActions.deleteAuthTokenSuccess, _ => ({
        ...initialState
    })),

    on(nasaDashboardActions.removeNasaWidget, (state, { payload: { id } }) => ({
        ...state,
        data: {
            widgets: state.data?.widgets.filter(widget => !(widget.id === id)) || [],
            id: state.data?.id || 0
        }
    }))
);

export function reducer(
    state = initialState,
    action: nasaDashboardActions.NasaDashboardAction
): NasaDashboardState {
    return nasaDashboardReducer(state, action);
}
