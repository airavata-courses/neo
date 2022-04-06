import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as a from '../actions';
import { catchError, delay, mergeMap, switchMap, take, throwError } from "rxjs";
import { hasPollingRequestFailed, NasaResult, PollingDataFail } from "src/app/dto";
import { PollingClientService } from "src/app/services/polling.service";

@Injectable()
export class PollingDataEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly pollingDataClient: PollingClientService
    ) { }

    pollingData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(a.pollingData),
            delay(10000),
            mergeMap(action =>
                this.pollingDataClient.get_poll(action.payload, action.payload.id).pipe(
                    take(1),
                    switchMap((response) => {
                        if (hasPollingRequestFailed(response)) {
                            return throwError(response)
                        }
                        if (response.result !== -1) {
                            if (action.payload.type === 'NASA') {
                                return [a.getNasaWidgetSuccess({ payload: { ...response, result: response.result as NasaResult,widgetId: action.payload.id, status: true, ack: '1' } })]
                            }
                            return [a.getWidgetSuccess({ payload: { ...response, image: response.result as string, id: action.payload.id, status: true, ack: '1' } })]
                        }
                        else return [a.pollingData(action)]
                    }),
                    catchError((error: PollingDataFail) => {
                        return [
                            action.payload.type === 'NEXRAD' ? a.getWidgetFail({ payload: { widgetId: action.payload.id, error } }):
                            a.getNasaWidgetFail({ payload: { widgetId: action.payload.id, error } })
                        ]
                    })
                ))
        )
    );
}
