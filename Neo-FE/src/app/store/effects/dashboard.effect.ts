import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as a from '../actions';
import { catchError, mergeMap, switchMap, take, throwError } from "rxjs";
import { hasWidgetRequestFailed, WidgetDataFail } from "src/app/dto";
import { DashboardClientService } from "src/app/services/dashboard.service";

@Injectable()
export class DashboardEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly dashboardClient: DashboardClientService
    ) { }

    getDashboard$ = createEffect(() =>
        this.actions$.pipe(
            ofType(a.getWidget),
            mergeMap(action =>
                this.dashboardClient.get_widget(action.payload).pipe(
                    take(1),
                    switchMap((response) => {
                        if (hasWidgetRequestFailed(response)) {
                            return throwError(response)
                        }
                        if (response.data_output_value !== -1) {
                            return [a.getWidgetSuccess({ payload: { ...response, id: action.payload.id } })]
                        }
                        else {
                            return [a.getWidgetSuccess({ payload: { ...response, id: action.payload.id } }), a.pollingData({payload: {id: action.payload.id, request_id: action.payload.request_id, email: action.payload.email, type: 'NEXRAD'}})]
                        }
                    }),
                    catchError((error: WidgetDataFail) => [
                        a.getWidgetFail({ payload: { widgetId: action.payload.id, error } })
                    ])
                ))
        )
    );
}
