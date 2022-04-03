import { createAction, props } from "@ngrx/store";
import { WidgetArgs, WidgetData, WidgetDataFail } from "src/app/dto";

interface WidgetFailPayload {
    readonly widgetId: number;
    readonly error: WidgetDataFail;
}

export const getWidgetFail = createAction(
    '[Dashboard] Get Widget Failed',
    props<{ readonly payload: WidgetFailPayload }>()
);

export const getWidget = createAction(
    '[Dashboard] Get Widget',
    props<{ readonly payload: WidgetArgs }>()
)

export const getWidgetSuccess = createAction(
    '[Dashboard] Get Widget Success',
    props<{ readonly payload: WidgetData }>()
)

export const removeWidgetFail = createAction(
    '[Dashboard] Remove Widget Failed',
    props<{ readonly payload: WidgetFailPayload }>()
);

export const removeWidget = createAction(
    '[Dashboard] Remove Widget',
    props<{ readonly payload: { id: number } }>()
)

export type DashboardAction =
    | typeof getWidgetFail
    | typeof getWidget
    | typeof getWidgetSuccess
    | typeof removeWidget;
