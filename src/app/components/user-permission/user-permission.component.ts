import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ApiResource } from '../../models/api-resource.model';
import { ApiUser } from '../../models/api-user.model';
import { Permission } from '../../models/permission.model';

import { ApiDataService } from '../../services/api-data.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'user-permission',
  templateUrl: './user-permission.component.html'
})
export class UserPermissionComponent implements OnInit{

  @Input() permission: Permission;
  @Output() delete: EventEmitter<null> = new EventEmitter();

  userCtrl: FormControl;
  filteredUsers: Observable<ApiUser[]>;
  users: Array<ApiUser>;

  allActions: Array<string>;

  constructor(
    private _apiData: ApiDataService) {
    this.userCtrl = new FormControl();
    this.users = [];
    this.allActions = ["index", "show", "create", "update", "destroy"];
  }

  ngOnInit() {
    this._apiData.getApiUsers().subscribe(data => {
      this.createUsers(data);
      this.filteredUsers = this.userCtrl.valueChanges
        .startWith(null)
        .map((name: string ) => this.filterOwners(name));
    }, error => console.log(error));
  }

  filterOwners(name: string) {
    return name ? this.users.filter((user: ApiUser) => new RegExp(`^${name}`, 'gi').test(user.name)) : this.users;
  }

  createUsers(data: any) {
    let user;
    data.forEach((userAttributes: Object) => {
      user = new ApiUser(userAttributes);
      this.users.push(user);
    })
  }

  emitDelete() {
    this.delete.emit();
  }

}
