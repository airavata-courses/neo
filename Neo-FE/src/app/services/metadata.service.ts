import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MetaData } from "../dto";

@Injectable({
    providedIn: 'root'
})
export class MetadataClientService {

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

    get_metadata():Observable<MetaData> {
        return this.http.get<MetaData>(
            this.getPath('metadata')
        );
    }

    get_map_data():Observable<Object> {
        return this.http.get<Object>('https://code.highcharts.com/mapdata/custom/world.topo.json');
    }
}