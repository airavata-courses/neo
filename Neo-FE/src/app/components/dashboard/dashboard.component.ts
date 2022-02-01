import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { take } from "rxjs";
import { WidgetProperty } from "src/app/dto";
import { OPTIONS, Safe } from "src/app/model/gridster-config";
import { DashboardFacade } from "src/app/services/dashboard.facade";
import { ModalService } from "src/app/services/modal.service";
import { AddWidgetModalComponent, AddWidgetModalData } from "./add-widget-modal/add-widget-modal.component";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
    options: Safe = OPTIONS;
    dashboard$ = this.dashboardService.getWidgetsList$;
    nextId$ = this.dashboardService.nextId$;

    constructor(
        private readonly dashboardService: DashboardFacade,
        private readonly modalService: ModalService
    ) {}

    changedOptions(): void {
        if (this.options.api && this.options.api.optionsChanged) {
            this.options.api.optionsChanged();
        }
    }

    removeItem($event: MouseEvent | TouchEvent, item: WidgetProperty): void {
        $event.preventDefault();
        $event.stopPropagation();
        // this.dashboard.splice(this.dashboard.indexOf(item), 1);
    }

    addItem(id: number): void {
        const modal = this.modalService.open(
            AddWidgetModalComponent,
            AddWidgetModalData.asConfig(
                'Please select weather details to project.'
            )
        );

        const component = modal.componentInstance;
        component.confirm.pipe(take(1)).subscribe((payload: MatDialogRef<AddWidgetModalComponent,any>) => {
            const instance = payload.componentInstance;

            this.dashboardService.getWidget({
                station: instance.station,
                date: instance.date,
                day: instance.day,
                year: instance.year,
                month: instance.month,
                hour: instance.hour,
                minute: instance.minute,
                feature: instance.feature,
                id,
                gridster: {
                    x: 0,
                    y: 0,
                    cols: 1,
                    rows: 1
                }
            });
            
            modal.close();
        })
    }
}