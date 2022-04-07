import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as a from '../actions';
import { catchError, switchMap, take, throwError } from "rxjs";
import { MetadataClientService } from "src/app/services/metadata.service";

@Injectable()
export class MetadataEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly metadataClient: MetadataClientService
    ) { }

    getMetadata$ = createEffect(() =>
        this.actions$.pipe(
            ofType(a.getMetadata),
            switchMap(() =>
                this.metadataClient.get_metadata().pipe(
                    take(1),
                    switchMap((response) => {
                        if (response && response.properties && response.stations) {
                            return [a.getMetadataSuccess({payload: response})]
                        }
                        return throwError(false)
                    }),
                    catchError((error: boolean) => [
                        a.getMetadataFail({ payload: { error } })
                    ])
                ))
        )
    );

    getMapdata$ = createEffect(() =>
        this.actions$.pipe(
            ofType(a.getMapdata),
            switchMap(() =>
                this.metadataClient.get_map_data().pipe(
                    take(1),
                    switchMap((response) => {
                        return [a.getMapdataSuccess({payload: response})]
                    }),
                    catchError((error: boolean) => [
                    ])
                ))
        )
    );
}