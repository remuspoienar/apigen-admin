import { ApiProject } from './api-project.model';
import { ApiDataService } from '../services/api-data.service';

export class ApiUser {

    id: number;
    name: string;
    email: string;

    private static _current: ApiUser = null;

    private _apiProjects: Array<ApiProject> = [];

    constructor(attributes: Object) {
        this.id = attributes['id'];
        this.name = attributes['name'];
        this.email = attributes['email'];

        if (attributes.hasOwnProperty('api_projects')) {
            this.createApiProjects(attributes['api_projects'])
        }
    }

    get apiProjects(): Array<ApiProject> {
        return this._apiProjects;
    }

    getProject(id: number): ApiProject {
        return this._apiProjects.find(apiProject => apiProject.id === id);
    }

    createApiProjects(data: Array<Object>) {
        this._apiProjects = [];
        let apiProject;
        data.forEach((apiProjectAttributes: Object) => {
            apiProject = new ApiProject(apiProjectAttributes);
            apiProject.createdById = this.id;
            this._apiProjects.push(apiProject);
        })
    }

    static get current(): ApiUser {
        // console.log(JSON.stringify(ApiUser._current));
        if (ApiUser._current !== null && ApiUser.userData()['id'] === ApiUser._current.id) {
            return ApiUser._current;
        }
        if (ApiUser.userData()['id'] !== undefined) {
            ApiUser._current = new ApiUser(ApiUser.userData());
            return ApiUser._current;
        }
        return null;
    }

    private static userData(): Object {
        let result = JSON.parse(localStorage.getItem('currentUser'));
        if (result === null) return {};
        return result;
    }

}