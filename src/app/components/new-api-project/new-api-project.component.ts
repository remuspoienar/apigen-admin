import { Component, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiUser } from '../../models/api-user.model';
import { ApiProject } from '../../models/api-project.model';
import { ApiResource } from '../../models/api-resource.model';
import { ApiDataService } from '../../services/api-data.service';

@Component({
    selector: 'new-api-project',
    templateUrl: './../api-project-detail/api-project-detail.component.html',
    styleUrls: ['./../api-project-detail/api-project-detail.component.css']
})
export class NewApiProjectComponent {

    constructor(
        private _apiData: ApiDataService,
        private _router: Router,
        private route: ActivatedRoute) {
          this.apiProject = new ApiProject({});
          ApiProject.current = this.apiProject;
        }

    apiProject: ApiProject;
    formAction: string = 'create';

    get currentUser(): ApiUser {
        return ApiUser.current;
    }

    addNewResource() {
        this.apiProject.apiResources.unshift(new ApiResource({}));
    }

    deleteResource(index: number) {
        this.apiProject.apiResources.splice(index, 1);
    }

    goBackToProjects() {
        this._router.navigate(['/dashboard']);
    }

    onFormActionClick() {
        this._apiData.createProject(this.apiProject).subscribe(data => this.goBackToProjects(), error => console.log(error));;
    }

}
