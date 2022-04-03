import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { take } from "rxjs";
import { WidgetProperty } from "src/app/dto";
import { OPTIONS, Safe } from "src/app/model/gridster-config";
import { AuthFacade } from "src/app/services/auth.facade";
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
    readonly dashboard$ = this.dashboardService.getWidgetsList$;
    readonly dashboardById$ = this.dashboardService.getWidgetsListbyId$;
    readonly error$ = this.dashboardService.error$;
    readonly nextId$ = this.dashboardService.nextId$;
    email = ''
    readonly getAuthData$ = this.authService.getAuthData$.subscribe((data) => {
        if (data.data?.email) {
            this.email = data.data?.email
        }
    });

    constructor(
        private readonly dashboardService: DashboardFacade,
        private readonly modalService: ModalService,
        private readonly authService: AuthFacade,
        private readonly domSanitizer: DomSanitizer
    ) { }

    changedOptions(): void {
        if (this.options.api && this.options.api.optionsChanged) {
            this.options.api.optionsChanged();
        }
    }

    removeItem($event: MouseEvent | TouchEvent, item: WidgetProperty): void {
        $event.preventDefault();
        $event.stopPropagation();

        this.dashboardService.removeWidget({ id: item.id });
    }

    sanitizeImage(base64Data: string) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${base64Data.slice(18,-4)}`);
    }

    getLabel(data: WidgetProperty) {
        return `${data.station}-${data.feature}-${data.date}`
    }

    configItem($event: MouseEvent | TouchEvent, item: WidgetProperty): void {
        $event.preventDefault();
        $event.stopPropagation();

        const modal = this.modalService.open(
            AddWidgetModalComponent,
            AddWidgetModalData.asConfig(
                'Please edit the weather details.',
                {
                    station: item.station,
                    feature: item.feature,
                    date: item.date,
                    buttonData: 'Update Widget'
                }
            )
        )

        const component = modal.componentInstance;
        component.confirm.pipe(take(1)).subscribe((payload: MatDialogRef<AddWidgetModalComponent, any>) => {
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
                id: item.id,
                gridster: {
                    x: 0,
                    y: 0,
                    cols: 1,
                    rows: 1
                },
                email: this.email
            });

            modal.close();
        })
    }

    addItem(id: number): void {
        const modal = this.modalService.open(
            AddWidgetModalComponent,
            AddWidgetModalData.asConfig(
                'Please select weather details to project.'
            )
        );

        const component = modal.componentInstance;
        component.confirm.pipe(take(1)).subscribe((payload: MatDialogRef<AddWidgetModalComponent, any>) => {
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
                },
                email: this.email
            });

            modal.close();
        })
    }


}