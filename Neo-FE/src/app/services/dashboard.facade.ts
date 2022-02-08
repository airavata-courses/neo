import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RemoveWidgetArgs, WidgetArgs } from '../dto';
import { neoActions as a, neoQuery as s, NeoStateSlice } from '../store';

@Injectable()
export class DashboardFacade {
  constructor(
    private readonly store: Store<NeoStateSlice>
  ) { }

  readonly getWidgetsList$ = this.store.select(s.widgetsList);
  readonly getWidgetsListbyId$ = this.store.select(s.widgetsListById);
  readonly nextId$ = this.store.select(s.getNextId);
  readonly error$ = this.store.select(s.getDashboardError);

  getWidget(payload: WidgetArgs) {
    this.store.dispatch(
      a.getWidget({
        payload
      })
    );
  }

  removeWidget(payload: RemoveWidgetArgs) {
    this.store.dispatch(
      a.removeWidget({ payload })
    )
  }
}