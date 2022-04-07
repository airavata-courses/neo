import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { neoActions as a, neoQuery as s, NeoStateSlice } from '../store';

@Injectable()
export class MetadataFacade {
    constructor(
        private readonly store: Store<NeoStateSlice>
    ) { }

    readonly getStations$ = this.store.select(s.getStations);
    readonly getStationById$ = this.store.select(s.getStationById);
    readonly getProperties$ = this.store.select(s.getProperties);
    readonly getNasaProperties$ = this.store.select(s.getNasaProperties);
    readonly getNasaPropertiesById$ = this.store.select(s.getNasaPropertiesById);
    readonly getMapData$ = this.store.select(s.getMapData);
    readonly error$ = this.store.select(s.getMetadataError);

    getMetadata() {
        this.store.dispatch(
            a.getMetadata()
        );
    }

    getMapData() {
        this.store.dispatch(
            a.getMapdata()
        )
    }
}
