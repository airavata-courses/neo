import { Component, EventEmitter, Inject, Optional, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Nullable } from 'src/app/model/state-slice';
import { MetadataFacade } from 'src/app/services/metadata.facade';

export interface AddNasaWidgetModalDataOptions {
  readonly feature?: string;
  readonly date?: string;
  readonly buttonData?: string;
}

export class AddNasaWidgetModalData {
  static asConfig(
    text: string | string[],
    {
      feature,
      date,
      buttonData
    }: AddNasaWidgetModalDataOptions = { buttonData: 'Add NASA Widget' }
  ): MatDialogConfig<AddNasaWidgetModalData> {
    return {
      data: new AddNasaWidgetModalData(text, feature, date, buttonData)
    };
  }
  constructor(
    readonly text: string | string[],
    readonly feature: string | undefined,
    readonly date: string | undefined,
    readonly buttonData: string | undefined
  ) { }
}

@Component({
  selector: 'add-nasa-widget-modal',
  templateUrl: './add-nasa-widget-modal.component.html',
  styleUrls: ['./add-nasa-widget-modal.component.scss']
})
export class AddNasaWidgetModalComponent {
  static config: MatDialogConfig<AddNasaWidgetModalData> = {
    maxWidth: '350px',
    minWidth: '350px'
  };
  constructor(
    private readonly dialog: MatDialogRef<AddNasaWidgetModalComponent, MatDialogRef<unknown>>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    readonly data: AddNasaWidgetModalData | null,
    private metadataService: MetadataFacade
  ) {
    const now = new Date();
    this.minDate = moment(new Date("July 21, 2015 00:00:00"));
    this.maxDate = moment(new Date().setDate(now.getDate() - 1));
  }

  @ViewChild('picker') picker: any;
  propertyControl = new FormControl(this.data?.feature || '', Validators.required);
  dateControl = new FormControl(!!this.data?.date ? moment(new Date(this.data.date)) : '', Validators.required);

  minDate: moment.Moment;
  maxDate: moment.Moment;

  readonly properties$ = this.metadataService.getNasaProperties$;
  readonly error$ = this.metadataService.error$;

  readonly confirm = new EventEmitter<
    MatDialogRef<AddNasaWidgetModalComponent>
  >();

  isDeleteInProgress = false;

  get textLines(): Nullable<string[]> {
    if (this.data?.text) {
      return typeof this.data.text === 'string'
        ? [this.data.text]
        : this.data.text;
    }
    return null;
  }

  get buttonText(): string {
    if (this.data?.buttonData) {
      return this.data.buttonData;
    }
    return 'Add NASA Widget';
  }

  confirmAdd() {
    this.isDeleteInProgress = true;
    this.confirm.emit(this.dialog);
    this.confirm.complete();
  }

  hasError() {
    return this.propertyControl.hasError('required')
      || this.dateControl.hasError('required')
      || !this.checkIfValueChanged();
  }

  private checkIfValueChanged() {
    return this.date !== this.data?.date || this.feature !== this.data?.feature
  }

  onClose() {
    this.dialog.close();
  }

  get day() {
    const day = this.dateFormControlValue.utc().date()
    if (day > 9) {
      return day.toString()
    }
    return "0" + day.toString();
  }

  get month() {
    const mon = this.dateFormControlValue.utc().month()
    if (mon > 8) {
      return (mon + 1).toString();
    }

    else {
      return "0" + (mon + 1).toString();
    }
  }

  get year() {
    return this.dateFormControlValue.utc().year().toString()
  }

  get hour() {
    const hour = this.dateFormControlValue.utc().hour()
    if (hour > 9) {
      return hour.toString()
    }
    return "0" + hour.toString();
  }

  get minute() {
    const minute = this.dateFormControlValue.utc().minute()
    if (minute > 9) {
      return minute.toString()
    }
    return "0" + minute.toString();
  }

  get feature() {
    return this.featureFormControlValue
  }

  get date() {
    return this.dateFormControlValue.toString()
  }

  private get dateFormControlValue() {
    return moment(this.dateControl.value)
  }

  private get featureFormControlValue() {
    return this.propertyControl.value
  }
}
