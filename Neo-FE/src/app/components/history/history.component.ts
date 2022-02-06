import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { AuthFacade } from "src/app/services/auth.facade";
import { HistoryFacade } from "src/app/services/history.facade";

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class HistoryComponent {
    readonly displayedColumns: string[] = ['station', 'feature', 'date'];
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

    constructor(
        private readonly historyService: HistoryFacade,
        private readonly authService: AuthFacade
    ) {

    }

    pageChanged(event: PageEvent) {
        this.historyService.getHistory({ email: this.email || '', page: event.pageIndex + 1 });
    }
}