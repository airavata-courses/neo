import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as a from '../actions';
import { catchError, switchMap, take, throwError } from "rxjs";
import { hasHistoryRequestFailed, HistoryDataFail } from "src/app/dto";
import { HistoryClientService } from "src/app/services/history.service";

@Injectable()
export class HistoryEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly historyClient: HistoryClientService
    ) { }

    getHistory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(a.getHistory),
            switchMap(action =>
                this.historyClient.get_history(action.payload).pipe(
                    take(1),
                    switchMap((response) => {
                        if (hasHistoryRequestFailed(response)) {
                            return throwError(response)
                        }
                        return [a.getHistorySuccess({ payload: response })]
                    }),
                    catchError((error: HistoryDataFail) => [
                        a.getHistoryFail({ payload: { error } })
                    ])
                ))
        )
    );
}