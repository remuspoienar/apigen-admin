import { Component, Input, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiUser } from '../../models/api-user.model';
import { ApiProject } from '../../models/api-project.model';
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

  get currentUser(): ApiUser {
      return ApiUser.current;
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
    }, error => console.log(error));
  }

  onTabSelectChange() {

  }

}
