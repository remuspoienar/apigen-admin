import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { ApiUser } from './../models/api-user.model';

@Injectable()
export class AuthenticationService {

    DEFAULT_HEADERS = new Headers({ 'Content-Type': 'application/json' });
    DEFAULT_OPTIONS = new RequestOptions({ headers: this.DEFAULT_HEADERS });

    constructor(
        private _http: Http) { }

    logout() {
        localStorage.removeItem("authToken");
        localStorage.removeItem('currentUser');
    }

    getUserData(): Observable<any> {
        let authToken = localStorage.getItem('authToken');
        if (authToken === null) return null;

        let options = this.DEFAULT_OPTIONS;
        options.headers.append('Authorization', authToken);
        return this._http.get('http://localhost:3003/me', options)
            .map(this.handleUserData)
            .catch(this.handleError);
    }

    login(email: string, password: string): Observable<any> {
        let data = {
            endpoint: 'http://localhost:3003/sign_in',
            body: {
                email: email,
                password: password
            }
        }
        return this.sendAuthRequest(data);
    }

    register(userData: any): Observable<any> {
        let data = {
            endpoint: 'http://localhost:3003/sign_up',
            body: userData
        }
        return this.sendAuthRequest(data);
    }

    sendAuthRequest(data: any): Observable<any> {
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

    private handleUserData(res: Response) {
        let body = res.json();
        localStorage.setItem('currentUser', JSON.stringify(body));
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