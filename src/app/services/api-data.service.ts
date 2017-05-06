import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiDataService {

    DEFAULT_HEADERS = new Headers({ 'Content-Type': 'application/json' });
    DEFAULT_OPTIONS = new RequestOptions({ headers: this.DEFAULT_HEADERS });

    constructor(
        private _http: Http) { }

    fetchApiProjects() {
        let authToken = localStorage.getItem('authToken');
        let options = this.DEFAULT_OPTIONS;
        options.headers.append('Authorization', authToken);
        return this._http.get('http://localhost:3003/api/v1/api_projects', options)
            .map(this.handleData)
            .catch(this.handleError);
    }

    private handleData(res: Response) {
        return res.json();
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