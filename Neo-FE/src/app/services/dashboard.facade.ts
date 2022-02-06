import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { WidgetArgs } from '../dto';
import { neoActions as a, neoQuery as s, NeoStateSlice } from '../store';

@Injectable()
export class DashboardFacade {
  constructor(
    private readonly store: Store<NeoStateSlice>
  ) { }

  readonly getWidgetsList$ = this.store.select(s.widgetsList);
  readonly getWidgetsListbyId$ = this.store.select(s.widgetsListById);
  readonly nextId$ = this.store.select(s.getNextId);

  getWidget(payload: WidgetArgs) {
    this.store.dispatch(
      a.getWidget({
        payload
      })
    );
  }
}
