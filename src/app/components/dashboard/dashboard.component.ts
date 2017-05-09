import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUser } from '../../models/api-user.model';
import { ApiProject } from '../../models/api-project.model';
import { ApiDataService } from '../../services/api-data.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(
        private _api: ApiDataService,
        private _router: Router) { }

    apiProjects: Array<Object> = null;
    loading: boolean = false;

    get currentUser() {
        return ApiUser.current;
    }

    ngOnInit() {
        if (ApiUser.current === null) {
            this._router.navigate(['signin']);
        } else {
            if(ApiUser.current.apiProjects.length > 0) return;
            this.fetchApiProjects();
        }
    }

    fetchApiProjects() {
        this.loading = true;
        this._api.fetchApiProjects().subscribe(
            data => {
                ApiUser.current.createApiProjects(data);
                this.apiProjects = ApiUser.current.apiProjects;
                this.loading = false;
            },
            error => {
                console.log(error);
                this.loading = false;
            }
        );
    }

    gotoNewProject() {
        this._router.navigate(['/api-projects', 'new'])
    }

    gotoProjectConfig(apiProjectId: number) {
        this._router.navigate(['/api-projects', apiProjectId])
    }

    gotoProjectLauncher(apiProjectId: number) {
        this._router.navigate(['/api-project-launchers', apiProjectId])
    }


}
