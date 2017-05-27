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

    rand: number;

    constructor (
      private _apiData: ApiDataService) {
        this.rand = Math.random() * 1000;
      }

    ngOnInit() {
      this.requestBody[this.apiResource.formattedName] = {};
    }

    onFormActionClick() {
      this._apiData.createResource(this.apiResource.tableName, this.requestBody).subscribe(data => alert(JSON.stringify(data)), error => console.log(error));
    }


    get rando() {
      return this.rand;
    }

}
