export type Nullable<T> = T | null;

export interface ErrorBase {
    readonly error: boolean;
}

export interface StateSliceBase<T, E = Nullable<ErrorBase>> {
    readonly loading: boolean;
    readonly loaded: boolean;
    readonly error: E;
}

export interface StateSlice<T, E = Nullable<ErrorBase>> extends StateSliceBase<E> {
    readonly data: T;
}