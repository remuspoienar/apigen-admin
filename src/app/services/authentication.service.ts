import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

    DEFAULT_OPTIONS = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });

    constructor(
        private _http: Http) { }

    logout() {
        localStorage.removeItem("authToken");
    }

    login(email: string, password: string): Observable<string> {
        let data = {
            endpoint: 'http://localhost:3003/sign_in',
            body: {
                email: email,
                password: password
            }
        }
        return this.sendAuthRequest(data);
    }

    register(userData:any): Observable<string> {
        let data = {
            endpoint: 'http://localhost:3003/sign_up',
            body: userData
        }
        return this.sendAuthRequest(data);
    }

    sendAuthRequest(data: any): Observable<string> {
        return this._http.post(data.endpoint, data.body, data.options || this.DEFAULT_OPTIONS)
            .map(this.storeAuthToken)
            .catch(this.handleError);
    }

    private storeAuthToken(res: Response) {
        let body = res.json();
        if (body.hasOwnProperty('token')) {
            localStorage.setItem('authToken', body['token']);
        }
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body['errors'] || JSON.stringify(body);
            // errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            errMsg = err;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        // console.error(errMsg);
        return Observable.throw(errMsg);
    }
}