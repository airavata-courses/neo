import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WidgetArgs, WidgetData, WidgetResponse } from "../dto/dashboard";

@Injectable({
    providedIn: 'root'
})
export class DashboardClientService {

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

    get_widget({ request_id, station, date, feature, day, month, year, hour, minute, email }: WidgetArgs): Observable<WidgetResponse<WidgetData>> {
        return this.http.get<WidgetResponse<WidgetData>>(
            this.getPath('nexrad-data'),
            {
                params: {
                    request_id,
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