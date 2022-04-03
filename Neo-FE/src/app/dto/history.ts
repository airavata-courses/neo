export interface HistoryDataFail {
    readonly error: boolean
}

export type HistoryResponse<T> = T | HistoryDataFail;

export const hasHistoryRequestFailed = <U>(historyResponse: HistoryResponse<U>): historyResponse is HistoryDataFail => Boolean(!(historyResponse as any).isAuth);

export interface HistoryArgs {
    readonly email: string,
    readonly page: number
}

export interface HistoryData {
    readonly id: string,
    readonly date: string,
    readonly station: string,
    readonly feature: string
}

export interface HistoryList {
    readonly isAuth?: boolean,
    readonly history?: HistoryData[],
    readonly totalPages?: number,
    readonly currentPage?: number,
    readonly exist?: boolean
}
