import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { catchError, Observable, tap, throwError, timeout } from "rxjs";

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
export const apiWithoutHeader: string[] = []

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
    constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number) {}

    addToken(req: HttpRequest<any>): HttpRequest<any> {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            return req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
        }

        return req;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const timeoutValue = req.headers.get('timeout') || this.defaultTimeout;
        const timeoutValueNumeric = Number(timeoutValue);

        if (this.apiWithNoHeaders(req)) {
        return next.handle(req)
        // .pipe(
        //     timeout(timeoutValueNumeric),
        //     tap((event: HttpResponse<any>) => {
        //     return event;
        //     }),
        //     catchError((error: HttpErrorResponse) => {
        //     return this.networkErrorScenario(error, req, next);
        //     })
        // );
        } else {
        return next.handle(this.addToken(req))
        // .pipe(
        //     timeout(timeoutValueNumeric),
        //     tap((response: HttpResponse<any>) => {
        //     return response;
        //     }),
        //     catchError((error: HttpErrorResponse) => {
        //     return this.networkErrorScenario(error, req, next);
        //     })
        // );
        }
    }

    private networkErrorScenario(error: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (error instanceof HttpErrorResponse) {
            const errorCode = (error as HttpErrorResponse).status;
            switch (true) {
              case (errorCode === 400):
                // return this.handle400Error(error);
                return throwError(error);
      
              case (errorCode === 401):
                // return this.handle401Error(request, next);
                return throwError(error);
      
              case (errorCode >= 500 && errorCode < 600):
                return throwError(error);
      
              case (errorCode === 0):
                return throwError(error);
      
              default:
                return throwError(error);
            }
          } else {
            return throwError(error);
          }
      
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // handle auth error, refresh the session
        return throwError('');
      }
    
      handle400Error(error: HttpErrorResponse): Observable<HttpEvent<any>> {
        if (error && error.status === 400) {
          return throwError(error);
        }
    
        return throwError(error);
      }
    
      apiWithNoHeaders(request: HttpRequest<object>): boolean {
        return apiWithoutHeader.includes(request.url);
      }
}