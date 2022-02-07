import { Component, EventEmitter, Inject, Optional, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Nullable } from 'src/app/model/state-slice';

export interface AddWidgetModalDataOptions {
  readonly station?: string;
  readonly feature?: string;
  readonly date?: string;
  readonly buttonData?: string;
}

export class AddWidgetModalData {
  static asConfig(
    text: string | string[],
    {
      station,
      feature,
      date,
      buttonData
    }: AddWidgetModalDataOptions = { buttonData: 'Add Widget' }
  ): MatDialogConfig<AddWidgetModalData> {
    return {
      data: new AddWidgetModalData(text, station, feature, date, buttonData)
    };
  }
  constructor(
    readonly text: string | string[],
    readonly station: string | undefined,
    readonly feature: string | undefined,
    readonly date: string | undefined,
    readonly buttonData: string | undefined
  ) { }
}

@Component({
  selector: 'add-widget-modal',
  templateUrl: './add-widget-modal.component.html',
  styleUrls: ['./add-widget-modal.component.scss']
})
export class AddWidgetModalComponent {
  static config: MatDialogConfig<AddWidgetModalData> = {
    maxWidth: '350px',
    minWidth: '350px'
  };
  constructor(
    private readonly dialog: MatDialogRef<AddWidgetModalComponent, MatDialogRef<unknown>>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    readonly data: AddWidgetModalData | null
  ) {
    const now = new Date();
    this.minDate = moment(new Date("July 21, 1983 00:00:00"));
    this.maxDate = moment(new Date().setDate(now.getDate() - 1));
  }

  @ViewChild('picker') picker: any;
  stationControl = new FormControl(this.data?.station || '', Validators.required);
  propertyControl = new FormControl(this.data?.feature || '', Validators.required);
  dateControl = new FormControl(!!this.data?.date ? moment(new Date(this.data.date)) : '', Validators.required);

  minDate: moment.Moment;
  maxDate: moment.Moment;

  stations: { name: string, code: string }[] = [
    { name: 'Indianapolis', code: 'KIND' },
    { name: 'Louisville', code: 'KLVX' },
    { name: 'Aberdien', code: 'KABR' },
    { name: 'Albany', code: 'KENX' }
  ];

  properties: { name: string }[] = [
    { name: 'velocity' },
    { name: 'reflectivity' },
    { name: 'cross-corelation-ratio' }
  ];
  readonly confirm = new EventEmitter<
    MatDialogRef<AddWidgetModalComponent>
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
    return 'Add Widget';
  }

  confirmAdd() {
    this.isDeleteInProgress = true;
    this.confirm.emit(this.dialog);
    this.confirm.complete();
  }

  hasError() {
    return this.stationControl.hasError('required')
      || this.propertyControl.hasError('required')
      || this.dateControl.hasError('required')
      || !this.checkIfValueChanged();
  }

  private checkIfValueChanged() {
    return this.date !== this.data?.date || this.station !== this.data?.station || this.feature !== this.data?.feature
  }

  onClose() {
    this.dialog.close();
  }

  get day() {
    return this.dateFormControlValue.utc().date().toString()
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
    return this.dateFormControlValue.utc().hour().toString()
  }

  get minute() {
    return this.dateFormControlValue.utc().minute().toString()
  }

  get station() {
    return this.stationFormControlValue
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

  private get stationFormControlValue() {
    return this.stationControl.value
  }

  private get featureFormControlValue() {
    return this.propertyControl.value
  }
}
