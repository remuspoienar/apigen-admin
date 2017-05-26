import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiProject } from '../models/api-project.model';

@Injectable()
export class ApiDataService {

    DEFAULT_HEADERS = new Headers({ 'Content-Type': 'application/json' });
    DEFAULT_OPTIONS = new RequestOptions({ headers: this.DEFAULT_HEADERS });

    constructor(
        private _http: Http) { }

    fetchApiProjects() {
        let authToken = localStorage.getItem('authToken');
        let options = this.DEFAULT_OPTIONS;
        if (!options.headers.get('Authorization')) options.headers.append('Authorization', authToken);
        return this._http.get('http://localhost:3003/api/v1/api_projects', options)
            .map(this.handleData)
            .catch(this.handleError);
    }

    fetchApiProject(id: number) {
        let authToken = localStorage.getItem('authToken');
        let options = this.DEFAULT_OPTIONS;
        if (!options.headers.get('Authorization')) options.headers.append('Authorization', authToken);
        return this._http.get(`http://localhost:3003/api/v1/api_projects/${id}`, options)
            .map(this.handleData)
            .catch(this.handleError);
    }

    updateProject(project: ApiProject) {
        let projectId = project.id;
        let data = project.asApiRequestFormat();

        return this._http.put(`http://localhost:3003/api/v1/api_projects/${projectId}`, data, this.optionsWithAuthHeader())
            .map(this.handleData)
            .catch(this.handleError);
    }

    createProject(project: ApiProject) {
        let data = project.asApiRequestFormat();
        return this._http.post('http://localhost:3003/api/v1/api_projects', data, this.optionsWithAuthHeader())
            .map(this.handleData)
            .catch(this.handleError);
    }

    deleteProject(id: number) {
        return this._http.delete(`http://localhost:3003/api/v1/api_projects/${id}`, this.optionsWithAuthHeader())
            .map(this.handleData)
            .catch(this.handleError);
    }

    fetchDbTypeOptions() {
        return this._http.get('http://localhost:3003/api/v1/db_type_options', this.optionsWithAuthHeader())
            .map(this.handleData)
            .catch(this.handleError);
    }

    fetchTraitOptions() {
        return this._http.get('http://localhost:3003/api/v1/trait_options', this.optionsWithAuthHeader())
            .map(this.handleData)
            .catch(this.handleError);
    }

    launchApiProject(id: number) {
      return this._http.get(`http://localhost:3003/api/v1/launch_project/${id}`, this.optionsWithAuthHeader())
          .map(this.handleData)
          .catch(this.handleError);
    }

    shutDownApiProject(id: number) {
      return this._http.get(`http://localhost:3003/api/v1/shutdown_project/${id}`, this.optionsWithAuthHeader())
          .map(this.handleData)
          .catch(this.handleError);
    }

    getResourceRecords(pluralizedResource: string) {
      return this._http.get(`http://localhost:4000/${pluralizedResource}`, this.optionsWithAuthHeader())
          .map(this.handleData)
          .catch(this.handleError);
    }

    private optionsWithAuthHeader() {
        let authToken = localStorage.getItem('authToken');
        let options = this.DEFAULT_OPTIONS;
        if (!options.headers.get('Authorization')) options.headers.append('Authorization', authToken);
        return options;
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
