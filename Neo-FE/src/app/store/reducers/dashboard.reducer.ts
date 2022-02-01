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
    on(dashboardActions.getWidget, (state, { payload }) => ({
        ...state,
        data: {
            widgets: [...(state.data?.widgets || []), { ...payload, id: (state.data?.id || 0) + 1, isLoading: true }],
            id: (state.data?.id || 0) + 1
        },
        loading: true
    })),

    on(dashboardActions.getWidgetSuccess, (state, { payload }) => {
        const indexOfData = (state.data?.widgets || []).findIndex((widget) => (widget.id === payload.id));
        let updatedData = [...state.data?.widgets || []]
        updatedData[indexOfData] = {
            ...updatedData[indexOfData],
            isLoading: false,
            image: payload.image
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
);

export function reducer(
    state = initialState,
    action: dashboardActions.DashboardAction
): DashboardState {
    return dashboardReducer(state, action);
}