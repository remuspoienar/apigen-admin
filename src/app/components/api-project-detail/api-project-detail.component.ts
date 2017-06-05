import { Component, Input, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiUser } from '../../models/api-user.model';
import { ApiProject } from '../../models/api-project.model';
import { ApiResource } from '../../models/api-resource.model';
import { ApiDataService } from '../../services/api-data.service';

@Component({
    selector: 'api-project-detail',
    templateUrl: './api-project-detail.component.html',
    styleUrls: ['./api-project-detail.component.css']
})
export class ApiProjectDetailComponent implements OnInit {

    constructor(
        private _apiData: ApiDataService,
        private _router: Router,
        private route: ActivatedRoute) { }

    apiProject: ApiProject = null;
    formAction: string = 'update';
    permissionsVisible: boolean = false;

    get showAdminActions(): boolean {
      return (this.apiProject.createdById === this.currentUser.id);
    }

    get currentUser(): ApiUser {
        return ApiUser.current;
    }

    ngOnInit() {
        let id = +this.route.snapshot.params['id'];
        this._apiData.fetchApiProject(id).subscribe(data => {
            this.apiProject = new ApiProject(data);
            ApiProject.current = this.apiProject;
        }, error => console.log(error));
    }

    deleteProject() {
        this._apiData.deleteProject(this.apiProject.id).subscribe(data => this.goBackToProjects(), error => console.log(error));
    }

    addNewResource() {
        this.apiProject.apiResources.unshift(new ApiResource({}));
    }

    deleteResource(index: number) {
        let resource = this.apiProject.apiResources[index];
        if (resource.id) {
            resource.markAsRemoved();
        } else {
            this.apiProject.apiResources.splice(index, 1);
        }

    }

    togglePermissions() {
      this.permissionsVisible = !this.permissionsVisible;
    }

    goBackToProjects() {
        // window.history.back();
        this._router.navigate(['/dashboard']);
    }

    onFormActionClick() {
        this._apiData.updateProject(this.apiProject).subscribe(data => this.goBackToProjects(), error => console.log(error));
    }

    saveToLocalStorage(key: string, data: string) {
        localStorage.setItem(key, data);
    }
}
