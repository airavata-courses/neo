import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { NasaWidgetArgs, NasaWidgetData, NasaWidgetResponse } from "../dto";

@Injectable({
    providedIn: 'root'
})
export class NasaDashboardClientService {

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

    get_nasa_widget({ request_id, date, feature, day, month, year, email }: NasaWidgetArgs, widgetId: number): Observable<NasaWidgetResponse<NasaWidgetData>> {
        return this.http.get<NasaWidgetResponse<NasaWidgetData>>(
            this.getPath('nasa-data'),
            {
                params: {
                    request_id,
                    date,
                    feature,
                    day,
                    month,
                    year,
                    email
                }
            }
        ).pipe(
            map((data) => ({...data, widgetId}))
        );
    }
}
