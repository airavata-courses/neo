import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthArgs, AuthTokenUser, UserTokenResponse } from "../dto";

@Injectable({
    providedIn: 'root'
})
export class AuthClientService {

    constructor(private readonly http: HttpClient) { }

    private readonly pathBase = `${window.location.origin}/api/`;

    private getPath(action: string) {
        return `${this.pathBase}${action}`
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    login(request: AuthArgs): Observable<UserTokenResponse<AuthTokenUser>> {
        return this.http.get<UserTokenResponse<AuthTokenUser>>(
            this.getPath('login'), { params: { ...request } }
        );
    }
}