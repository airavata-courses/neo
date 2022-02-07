import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WidgetArgs, WidgetData, WidgetResponse } from "../dto/dashboard";

@Injectable({
    providedIn: 'root'
})
export class DashboardClientService {

    constructor(private readonly http: HttpClient) { }

    private readonly pathBase = 'http://localhost:3000/';

    private getPath(action: string) {
        return `${this.pathBase}${action}`
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    get_widget({ id, station, date, feature, day, month, year, hour, minute, email }: WidgetArgs): Observable<WidgetResponse<WidgetData>> {
        return this.http.get<WidgetResponse<WidgetData>>(
            this.getPath('widget'),
            {
                params: {
                    id,
                    station,
                    date,
                    feature,
                    day,
                    month,
                    year,
                    hour,
                    minute,
                    email
                }
            }
        )
    }
}