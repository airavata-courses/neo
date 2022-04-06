import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { take } from "rxjs";
import { NasaWidgetProperty } from "src/app/dto";
import { OPTIONS, Safe } from "src/app/model/gridster-config";
import { AuthFacade } from "src/app/services/auth.facade";
import { ModalService } from "src/app/services/modal.service";
import { NasaDashboardFacade } from "src/app/services/nasa-dashboard.facade";
import { AddNasaWidgetModalComponent, AddNasaWidgetModalData } from "./add-nasa-widget-modal/add-nasa-widget-modal.component";

@Component({
    selector: 'app-nasa-dashboard',
    templateUrl: './nasa-dashboard.component.html',
    styleUrls: ['./nasa-dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NasaDashboardComponent {
    options: Safe = OPTIONS;
    readonly dashboard$ = this.nasaDashboardService.getNasaWidgetsList$;
    readonly dashboardById$ = this.nasaDashboardService.getNasaWidgetsListbyId$;
    readonly error$ = this.nasaDashboardService.nasaError$;
    readonly nextId$ = this.nasaDashboardService.nextNasaId$;
    email = ''
    readonly getAuthData$ = this.authService.getAuthData$.subscribe((data) => {
        if (data.data?.email) {
            this.email = data.data?.email
        }
    });

    constructor(
        private readonly nasaDashboardService: NasaDashboardFacade,
        private readonly modalService: ModalService,
        private readonly authService: AuthFacade,
        private readonly domSanitizer: DomSanitizer
    ) { }

    changedOptions(): void {
        if (this.options.api && this.options.api.optionsChanged) {
            this.options.api.optionsChanged();
        }
    }

    removeItem($event: MouseEvent | TouchEvent, item: NasaWidgetProperty): void {
        $event.preventDefault();
        $event.stopPropagation();

        this.nasaDashboardService.removeNasaWidget({ id: item.id });
    }

    sanitizeImage(base64Data: string) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${base64Data.slice(18,-4)}`);
    }

    getLabel(data: NasaWidgetProperty) {
        return `${data.feature}-${data.date}`
    }

    configItem($event: MouseEvent | TouchEvent, item: NasaWidgetProperty): void {
        $event.preventDefault();
        $event.stopPropagation();

        const modal = this.modalService.open(
            AddNasaWidgetModalComponent,
            AddNasaWidgetModalData.asConfig(
                'Please edit the weather details.',
                {
                    feature: item.feature,
                    date: item.date,
                    buttonData: 'Update NASA Widget'
                }
            )
        )

        const component = modal.componentInstance;
        component.confirm.pipe(take(1)).subscribe((payload: MatDialogRef<AddNasaWidgetModalComponent, any>) => {
            const instance = payload.componentInstance;

            this.nasaDashboardService.getNasaWidget({
                date: instance.date,
                day: instance.day,
                year: instance.year,
                month: instance.month,
                feature: instance.feature,
                id: item.id,
                request_id: 'abcde', // WRITE GENERATE REQUEST ID CODE 
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
            AddNasaWidgetModalComponent,
            AddNasaWidgetModalData.asConfig(
                'Please select weather details to project.'
            )
        );

        const component = modal.componentInstance;
        component.confirm.pipe(take(1)).subscribe((payload: MatDialogRef<AddNasaWidgetModalComponent, any>) => {
            const instance = payload.componentInstance;

            this.nasaDashboardService.getNasaWidget({
                date: instance.date,
                day: instance.day,
                year: instance.year,
                month: instance.month,
                feature: instance.feature,
                id,
                request_id: 'abcde', // WRITE GENERATE REQUEST ID CODE
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