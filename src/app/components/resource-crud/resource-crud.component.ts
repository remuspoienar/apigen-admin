import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiUser } from '../../models/api-user.model';
import { ApiResource } from '../../models/api-resource.model';
import { ApiAssociation } from '../../models/api-association.model';
import { ApiAttribute } from '../../models/api-attribute.model';

import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'resource-crud',
  templateUrl: './resource-crud.component.html'
})
export class ResourceCrudComponent implements OnInit {

  @Input() apiResource: ApiResource;

  requestBody: Object = {};
  isNew: boolean = false;
  reset: boolean = false;

  constructor(
    private _apiData: ApiDataService) { }

  ngOnInit() {
    this.requestBody[this.apiResource.formattedName] = {};
  }

  showNew(event: any) {
    this.isNew = true;
  }

  hideNew(event: any) {
    this.isNew = false;
    if(event['callServer']) {
      this.reset = true;
      setTimeout(() => this.reset = false, 0);
    }
  }

}
