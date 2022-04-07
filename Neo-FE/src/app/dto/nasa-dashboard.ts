import { GridsterItem } from "angular-gridster2";

export const hasNasaWidgetRequestFailed = <U>(nasaWidgetResponse: NasaWidgetResponse<U>): nasaWidgetResponse is NasaWidgetDataFail => Boolean(!(nasaWidgetResponse as any).isAuth);

export interface NasaWidgetArgs {
    readonly id: number
    readonly request_id: string,
    readonly date: string,
    readonly feature: string,
    readonly gridster: GridsterItem,
    readonly day: string,
    readonly month: string,
    readonly year: string,
    readonly email: string
}

export interface RemoveNasaWidgetArgs {
    readonly id: number
}

export interface NasaResult {
    "SLP": number[][]
}

export interface NasaWidgetData {
    readonly widgetId: number;
    readonly isAuth: boolean;
    readonly status: boolean;
    readonly ack: number;
    readonly result?: NasaResult | -1;
    readonly data_output_value?: string | -1
}

export interface NasaWidgetProperty extends NasaWidgetArgs {
    readonly isLoading: boolean,
    readonly image?: string,
    readonly ack?: number,
    readonly failed?: boolean,
    readonly result?: NasaResult | -1;
}

export interface NasaWidgetsList {
    widgets: NasaWidgetProperty[],
    id: number
}

export interface NasaWidgetDataFail {
    readonly widgetId: number,
    readonly error: boolean,
}

export type NasaWidgetResponse<T> = T | NasaWidgetDataFail;
