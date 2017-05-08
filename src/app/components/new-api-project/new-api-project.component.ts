import { Component, Input, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiUser } from '../../models/api-user.model';
import { ApiProject } from '../../models/api-project.model';

@Component({
    selector: 'new-api-project',
    templateUrl: './new-api-project.component.html',
    styleUrls: ['./new-api-project.component.css']
})
export class NewApiProjectComponent implements OnInit {

    constructor(
        private _router: Router,
        private route: ActivatedRoute) { }

    apiProject: ApiProject;

    ngOnInit() {
        // this.route.params
            // .subscribe((params: Params) => this.apiProject = ApiUser.current.getProject(+params['id']));
    }

}

