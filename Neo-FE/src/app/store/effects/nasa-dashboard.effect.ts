import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as a from '../actions';
import { catchError, mergeMap, switchMap, take, throwError } from "rxjs";
import { hasNasaWidgetRequestFailed, NasaWidgetDataFail } from "src/app/dto";
import { NasaDashboardClientService } from "src/app/services/nasa-dashboard.service";

@Injectable()
export class NasaDashboardEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly nasaDashboardClient: NasaDashboardClientService
    ) { }

    getNasaDashboard$ = createEffect(() =>
        this.actions$.pipe(
            ofType(a.getNasaWidget),
            mergeMap(action =>
                this.nasaDashboardClient.get_nasa_widget(action.payload, action.payload.id).pipe(
                    take(1),
                    switchMap((response) => {
                        if (hasNasaWidgetRequestFailed(response)) {
                            return throwError(response)
                        }
                        if (response.data_output_value !== -1) {
                            return [a.getNasaWidgetSuccess({ payload: { ...response, widgetId: action.payload.id } })]
                        }
                        else {
                            return [a.getNasaWidgetSuccess({ payload: { ...response, widgetId: action.payload.id } }), a.pollingData({payload: {id: action.payload.id, request_id: action.payload.request_id, email: action.payload.email, type: 'NASA'}})]
                        }
                    }),
                    catchError((error: NasaWidgetDataFail) => [
                        a.getNasaWidgetFail({ payload: { widgetId: action.payload.id, error } })
                    ])
                ))
        )
    );
}
