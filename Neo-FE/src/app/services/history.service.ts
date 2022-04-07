import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HistoryArgs, HistoryList, HistoryResponse } from "../dto";

@Injectable({
    providedIn: 'root'
})
export class HistoryClientService {

    constructor(private readonly http: HttpClient) { }

    private readonly pathBase = `https://dull-eagle-11.loca.lt/api/`;

    private getPath(action: string) {
        return `${this.pathBase}${action}`
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    get_history(request: HistoryArgs): Observable<HistoryResponse<HistoryList>> {
        return this.http.get<HistoryResponse<HistoryList>>(
            this.getPath('history'),
            { params: { ...request } }
        )
    }
}