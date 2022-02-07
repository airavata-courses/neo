import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import * as moment from "moment";
import { HistoryData, WidgetArgs, WidgetProperty, WidgetsList } from "src/app/dto";
import { AuthFacade } from "src/app/services/auth.facade";
import { DashboardFacade } from "src/app/services/dashboard.facade";
import { HistoryFacade } from "src/app/services/history.facade";

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class HistoryComponent {
    readonly displayedColumns: string[] = ['station', 'feature', 'date', 'action'];
    email = ""
    readonly history$ = this.historyService.getHistoryList$;
    readonly page$ = this.historyService.getHistoryPage$;
    readonly count$ = this.historyService.getHistoryCount$;
    readonly loading$ = this.historyService.loading$;
    readonly error$ = this.historyService.error$;
    readonly getAuthData$ = this.authService.getAuthData$.subscribe((data) => {
        if (data.data?.email) {
            this.email = data.data?.email
            this.historyService.getHistory({ email: data.data?.email || '', page: 1 });
        }
    });
    readonly dashboard$ = this.widgetService.getWidgetsList$
    nextId$ = this.widgetService.nextId$;

    constructor(
        private readonly historyService: HistoryFacade,
        private readonly authService: AuthFacade,
        private readonly widgetService: DashboardFacade
    ) {

    }

    pageChanged(event: PageEvent) {
        this.historyService.getHistory({ email: this.email || '', page: event.pageIndex + 1 });
    }

    confirmAdd(item: HistoryData, id: number) {
        this.widgetService.getWidget(this.makeData(item, id))
    }

    private makeData(item: HistoryData, id: number): WidgetArgs {

        const date = moment(new Date(item.date)).utc();

        return {
            station: item.station,
            date: item.date,
            day: date.day().toString(),
            year: date.year().toString(),
            month: this.month(date.month()),
            hour: date.hour().toString(),
            minute: date.minute().toString(),
            feature: item.feature,
            id,
            gridster: {
                x: 0,
                y: 0,
                cols: 1,
                rows: 1
            },
            email: this.email
        }
    }

    private month(mon: number) {
        if (mon > 8) {
            return (mon + 1).toString();
        }

        else {
            return "0" + (mon + 1).toString();
        }
    }

    hasSpace(widgets: WidgetProperty[]) {
        return widgets.length < 10
    }
}