import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiUser } from '../../models/api-user.model';
import { ApiResource } from '../../models/api-resource.model';
import { ApiAssociation } from '../../models/api-association.model';
import { ApiAttribute } from '../../models/api-attribute.model';

import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'resource-new',
  templateUrl: './resource-new.component.html'
})
export class ResourceNewComponent implements OnInit {

  @Input() apiResource: ApiResource;
  @Output() hide: EventEmitter<any> = new EventEmitter();

  requestBody: Object = {};

  constructor(
    private _apiData: ApiDataService) { }

  ngOnInit() {
    this.requestBody[this.apiResource.formattedName] = {};
  }

  onFormActionClick() {
    this._apiData.createResource(this.apiResource.tableName, this.requestBody).subscribe(data => this.hideNew({'callServer': true}), error => console.log(error));
  }

  hideNew(options: Object = {}) {
    this.hide.emit(options);
  }

}
