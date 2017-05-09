import { Component, Input, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiUser } from '../../models/api-user.model';
import { ApiProject } from '../../models/api-project.model';
import { ApiResource } from '../../models/api-resource.model';

@Component({
    selector: 'api-project-detail',
    templateUrl: './api-project-detail.component.html',
    styleUrls: ['./api-project-detail.component.css']
})
export class ApiProjectDetailComponent implements OnInit {

    constructor(
        private _router: Router,
        private route: ActivatedRoute) { }

    apiProject: ApiProject;

    get currentUser(): ApiUser {
        return ApiUser.current;
    }

    ngOnInit() {
        this.route.params
            .subscribe((params: Params) => this.apiProject = ApiUser.current.getProject(+params['id']));
    }

    deleteProject() {

    }

    addNewResource() {
        this.apiProject.apiResources.unshift(new ApiResource({}));
    }

    deleteResource(index: number) {
        this.apiProject.apiResources.splice(index, 1);
    }

    goBackToProjects() {
        window.history.back();
        // this._router.navigate(['/dashboard']);
    }

    updateProject() {

    }

    isWithoutResources(): boolean {
        return this.apiProject.apiResources.length === 0;
    }
}

