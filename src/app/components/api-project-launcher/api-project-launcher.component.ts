import { Component, Input, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiUser } from '../../models/api-user.model';
import { ApiProject } from '../../models/api-project.model';
import { ApiResource } from '../../models/api-resource.model';
import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'api-project-launcher',
  templateUrl: './api-project-launcher.component.html',
  styleUrls: ['./api-project-launcher.component.css']
})
export class ApiProjectLauncherComponent implements OnInit {

  constructor(
    private _apiData: ApiDataService,
    private _router: Router,
    private route: ActivatedRoute) { }

  loading: boolean = false;
  i: number = 0;

  apiProject: ApiProject;
  apiResource: ApiResource;

  get currentUser(): ApiUser {
      return ApiUser.current;
  }

  get currentResource(): ApiResource {
    return ApiResource.current;
  }

  ngOnInit() {
    this.fetchApiProject();
  }

  launchApiProject() {
    this.loading = true;
    let id = +this.route.snapshot.params['id']; this.loading = true;
    this._apiData.launchApiProject(id).subscribe(data => {
    this.loading = false;
    this.fetchApiProject();
    }, error => console.log(error));
  }

  shutdownApiProject() {
    this.loading = true;
    let id = +this.route.snapshot.params['id'];
    this._apiData.shutDownApiProject(id).subscribe(data => {
      this.loading = false;
      this.fetchApiProject();
    }, error => console.log(error));
  }

  fetchApiProject() {
    let id = +this.route.snapshot.params['id'];
    this._apiData.fetchApiProject(id).subscribe(data => {
        this.apiProject = new ApiProject(data);
        ApiProject.current = this.apiProject;
        this.apiResource = this.apiProject.apiResources[0];
    }, error => console.log(error));
  }

  onTabSelectChange(event: any) {
    this.apiResource = null;
    let resourceName = event['tab']['textLabel'];
    let resource = this.apiProject.apiResources.find(resource => resource.name === resourceName);
    setTimeout(() => this.apiResource = resource, 0)
  }

}
