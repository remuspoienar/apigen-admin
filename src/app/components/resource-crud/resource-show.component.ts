import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiUser } from '../../models/api-user.model';
import { ApiResource } from '../../models/api-resource.model';
import { ApiAssociation } from '../../models/api-association.model';
import { ApiAttribute } from '../../models/api-attribute.model';

import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'resource-show',
  templateUrl: './resource-new.component.html'
})
export class ResourceShowComponent implements OnInit {

  @Input() apiResource: ApiResource;
  @Input() data: Object;
  @Output() hide: EventEmitter<any> = new EventEmitter();

  requestBody: Object = {};
  action: string = "update";

  constructor(
    private _apiData: ApiDataService) { }

  ngOnInit() {
    this.requestBody[this.apiResource.formattedName] = Object.assign({}, this.data);
    this.requestBody['id'] = this.data['id'];
    delete this.requestBody[this.apiResource.formattedName]['id'];
  }

  onFormActionClick() {
    this._apiData.updateResource(this.apiResource.tableName, this.requestBody).subscribe(data => this.hideNew({'callServer': true}), error => console.log(error));
  }

  hideNew(options: Object = {}) {
    this.hide.emit(options);
  }

}
