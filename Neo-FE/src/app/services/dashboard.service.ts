import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { map, Observable } from "rxjs";
import { WidgetArgs, WidgetData, WidgetResponse } from "../dto/dashboard";

@Injectable({
    providedIn: 'root'
})
export class DashboardClientService {

    constructor(private readonly http: HttpClient){}

    private readonly pathBase = 'http://localhost:3000/';

    private getPath(action: string) {
        return `${this.pathBase}${action}`
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    get_widget(request: WidgetArgs): Observable<WidgetResponse<WidgetData>> {
        return this.http.post<WidgetResponse<WidgetData>>(
            this.getPath('get-widget'),
            request
        ).pipe(
            map(response => ({...response, id: request.id}))
        )
    }
}