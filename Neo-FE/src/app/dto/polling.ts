import { NasaResult } from './nasa-dashboard'

export const hasPollingRequestFailed = <U>(pollingResponse: PollingResponse<U>): pollingResponse is PollingDataFail => Boolean(!(pollingResponse as any).isAuth);

export interface PollingArgs {
    readonly id: number
    readonly request_id: string,
    readonly email: string,
    readonly type: 'NEXRAD' | 'NASA'
}

export interface PollingData {
    readonly widgetId: number;
    readonly isAuth: boolean;
    readonly result?: NasaResult | -1 | string;
}

export interface PollingDataFail {
    readonly widgetId: number,
    readonly error: boolean,
}

export type PollingResponse<T> = T | PollingDataFail;
