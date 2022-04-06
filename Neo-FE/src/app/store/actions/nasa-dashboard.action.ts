import { createAction, props } from "@ngrx/store";
import { NasaWidgetArgs, NasaWidgetData, NasaWidgetDataFail } from "src/app/dto";

interface NasaWidgetFailPayload {
    readonly widgetId: number;
    readonly error: NasaWidgetDataFail;
}

export const getNasaWidgetFail = createAction(
    '[Dashboard] Get Nasa Widget Failed',
    props<{ readonly payload: NasaWidgetFailPayload }>()
);

export const getNasaWidget = createAction(
    '[Dashboard] Get Nasa Widget',
    props<{ readonly payload: NasaWidgetArgs }>()
)

export const getNasaWidgetSuccess = createAction(
    '[Dashboard] Get Nasa Widget Success',
    props<{ readonly payload: NasaWidgetData }>()
)

export const removeNasaWidgetFail = createAction(
    '[Dashboard] Remove Nasa Widget Failed',
    props<{ readonly payload: NasaWidgetFailPayload }>()
);

export const removeNasaWidget = createAction(
    '[Dashboard] Remove Nasa Widget',
    props<{ readonly payload: { id: number } }>()
)

export type NasaDashboardAction =
    | typeof getNasaWidgetFail
    | typeof getNasaWidget
    | typeof getNasaWidgetSuccess
    | typeof removeNasaWidget;
