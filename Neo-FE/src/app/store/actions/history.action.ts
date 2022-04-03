import { createAction, props } from "@ngrx/store";
import { HistoryArgs, HistoryDataFail, HistoryList } from "src/app/dto";

interface HistoryFailPayload {
    readonly error: HistoryDataFail;
}

export const getHistoryFail = createAction(
    '[Dashboard] Get History Failed',
    props<{ readonly payload: HistoryFailPayload }>()
);

export const getHistory = createAction(
    '[Dashboard] Get History',
    props<{ readonly payload: HistoryArgs }>()
)

export const getHistorySuccess = createAction(
    '[Dashboard] Get History Success',
    props<{ readonly payload: HistoryList }>()
)

export type HistoryAction =
    | typeof getHistoryFail
    | typeof getHistory
    | typeof getHistorySuccess;
