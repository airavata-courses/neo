import { merge, of, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const catchMap = <T, E = any>(
  fn: (err: E) => T
): OperatorFunction<T, T> =>
  catchError((error, caught) => merge(caught, of(fn(error))));
