import { createReducer, on } from "@ngrx/store";
import { WidgetsList } from "src/app/dto"
import { Nullable, StateSlice } from "../../model/state-slice"

import * as dashboardActions from '../actions';

export interface DashboardState extends StateSlice<Nullable<WidgetsList>> { }

export const initialState: DashboardState = {
    data: {
        widgets: [],
        id: 0
    },
    loaded: false,
    loading: false,
    error: null
};

const dashboardReducer = createReducer(
    initialState,
    on(dashboardActions.getWidget, (state, { payload }) => {
        const indexOfData = (state.data?.widgets || []).findIndex((widget) => (widget.id === payload.id));
        if (indexOfData >= 0) {
            let updatedData = [...state.data?.widgets || []]
            updatedData[indexOfData] = {
                ...updatedData[indexOfData],
                isLoading: true,
                station: payload.station,
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

    on(dashboardActions.getWidgetSuccess, (state, { payload }) => {
        const indexOfData = (state.data?.widgets || []).findIndex((widget) => (widget.id === payload.id));
        let updatedData = [...state.data?.widgets || []]
        updatedData[indexOfData] = {
            ...updatedData[indexOfData],
            isLoading: false,
            ack: payload.ack,
            image: payload.data_output_value && payload.data_output_value !== -1? (payload.data_output_value as unknown as string).slice(4,-2) as string : undefined
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

    on(dashboardActions.getWidgetFail, (state, { payload }) => {
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

    on(dashboardActions.deleteAuthTokenSuccess, _ => ({
        ...initialState
    })),

    on(dashboardActions.removeWidget, (state, { payload: { id } }) => ({
        ...state,
        data: {
            widgets: state.data?.widgets.filter(widget => !(widget.id === id)) || [],
            id: state.data?.id || 0
        }
    }))
);

export function reducer(
    state = initialState,
    action: dashboardActions.DashboardAction
): DashboardState {
    return dashboardReducer(state, action);
}