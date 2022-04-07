import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RemoveNasaWidgetArgs, NasaWidgetArgs } from '../dto';
import { neoActions as a, neoQuery as s, NeoStateSlice } from '../store';

@Injectable()
export class NasaDashboardFacade {
  constructor(
    private readonly store: Store<NeoStateSlice>
  ) { }

  readonly getNasaWidgetsList$ = this.store.select(s.nasaWidgetsList);
  readonly getNasaWidgetsListbyId$ = this.store.select(s.nasaWidgetsListById);
  readonly nextNasaId$ = this.store.select(s.getNasaNextId);
  readonly nasaError$ = this.store.select(s.getNasaDashboardError);

  getNasaWidget(payload: NasaWidgetArgs) {
    this.store.dispatch(
      a.getNasaWidget({
        payload
      })
    );
  }

  removeNasaWidget(payload: RemoveNasaWidgetArgs) {
    this.store.dispatch(
      a.removeNasaWidget({ payload })
    )
  }
}
