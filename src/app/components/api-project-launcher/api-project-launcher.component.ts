import { Component, Input, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiUser } from '../../models/api-user.model';
import { ApiProject } from '../../models/api-project.model';

@Component({
    selector: 'api-project-launcher',
    templateUrl: './api-project-launcher.component.html',
    styleUrls: ['./api-project-launcher.component.css']
})
export class ApiProjectLauncherComponent implements OnInit {

    constructor(
        private _router: Router,
        private route: ActivatedRoute) { }

    apiProject: ApiProject;

    ngOnInit() {
        this.route.params
            .subscribe((params: Params) => this.apiProject = ApiUser.current.getProject(+params['id']));
    }

}

