import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HistoryArgs } from '../dto';
import { neoActions as a, neoQuery as s, NeoStateSlice } from '../store';

@Injectable()
export class HistoryFacade {
    constructor(
        private readonly store: Store<NeoStateSlice>
    ) { }

    readonly getHistoryList$ = this.store.select(s.getHistoryList);
    readonly getHistoryPage$ = this.store.select(s.getCurrentPage);
    readonly getHistoryCount$ = this.store.select(s.getDataLength);
    readonly loading$ = this.store.select(s.getHistoryLoading);
    readonly error$ = this.store.select(s.getHistoryError);

    getHistory(payload: HistoryArgs) {
        this.store.dispatch(
            a.getHistory({
                payload
            })
        );
    }
}
