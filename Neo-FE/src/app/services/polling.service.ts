import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { NasaWidgetData, PollingArgs, PollingData, PollingResponse } from "../dto";

@Injectable({
    providedIn: 'root'
})
export class PollingClientService {

    constructor(private readonly http: HttpClient) { }

    private readonly pathBase = `http://149.165.153.238:32000/api/`;

    private getPath(action: string) {
        return `${this.pathBase}${action}`
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    get_poll({ request_id, email }: PollingArgs, widgetId: number): Observable<PollingResponse<PollingData>> {
        return this.http.get<PollingResponse<NasaWidgetData>>(
            this.getPath('poll-data'),
            {
                params: {
                    request_id,
                    email
                }
            }
        ).pipe(
            map((data) => ({...data, widgetId}))
        );
    }
}