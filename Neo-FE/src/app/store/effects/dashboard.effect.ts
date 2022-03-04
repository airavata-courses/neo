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
                        return [a.getWidgetSuccess({ payload: { ...response, id: action.payload.id } })]
                    }),
                    catchError((error: WidgetDataFail) => [
                        a.getWidgetFail({ payload: { widgetId: action.payload.id, error } })
                    ])
                ))
        )
    );
}