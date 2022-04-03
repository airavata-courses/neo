import { filter } from 'rxjs/operators';

export type Nil = null | undefined;
export type Option<T> = T | Nil;
export const takeIfExists = <T>() => filter<Option<T>, T>(Boolean as any);