import { GridsterItem } from "angular-gridster2";

export const hasWidgetRequestFailed = <U>(widgetResponse: WidgetResponse<U>): widgetResponse is WidgetDataFail => Boolean(!(widgetResponse as any).isAuth);

export interface WidgetArgs {
    readonly id: number,
    readonly request_id: string,
    readonly station: string,
    readonly date: string,
    readonly feature: string,
    readonly gridster: GridsterItem,
    readonly day: string,
    readonly month: string,
    readonly year: string,
    readonly hour: string,
    readonly minute: string,
    readonly email: string
}

export interface RemoveWidgetArgs {
    readonly id: number
}

export interface WidgetData {
    readonly id: number,
    readonly isAuth: boolean,
    readonly status: boolean,
    readonly image?: string,
    readonly ack?: number,
    readonly data_output_value?: string | -1
}

export interface WidgetProperty extends WidgetArgs {
    readonly isLoading: boolean,
    readonly image?: string,
    readonly failed?: boolean,
    readonly ack?: number
}

export interface WidgetsList {
    widgets: WidgetProperty[],
    id: number
}

export interface WidgetDataFail {
    readonly widgetId: number,
    readonly error: boolean
}

export type WidgetResponse<T> = T | WidgetDataFail;
