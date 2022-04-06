import { createAction, props } from "@ngrx/store";
import { NasaWidgetData, PollingArgs, PollingDataFail } from "src/app/dto";

interface PollingFailPayload {
    readonly widgetId: number;
    readonly error: PollingDataFail;
}

export const pollingDataFail = createAction(
    '[Dashboard] Polling Data Failed',
    props<{ readonly payload: PollingFailPayload }>()
);

export const pollingData = createAction(
    '[Dashboard] Polling Data',
    props<{ readonly payload: PollingArgs }>()
)

export const pollingDataSuccess = createAction(
    '[Dashboard] Polling Data Success',
    props<{ readonly payload: NasaWidgetData }>()
)

export type PollingDataAction =
    | typeof pollingDataFail
    | typeof pollingData
    | typeof pollingDataSuccess;
