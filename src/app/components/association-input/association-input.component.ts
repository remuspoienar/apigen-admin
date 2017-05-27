import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { ApiUser } from '../../models/api-user.model';
import { ApiResource } from '../../models/api-resource.model';
import { ApiAssociation } from '../../models/api-association.model';
import { ApiAttribute } from '../../models/api-attribute.model';

import { ApiDataService } from '../../services/api-data.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    selector: 'association-input',
    templateUrl: './association-input.component.html'
})
export class AssociationInputComponent implements OnInit {

    @Input() reverseAssociation: Object;
    @Input() apiResource: ApiResource;
    @Input() requestBody: Object;

    ownerCtrl: FormControl;
    filteredOwners: any;
    owners: Array<Object>;

    constructor(
      private _apiData: ApiDataService
    ) {
      this.ownerCtrl = new FormControl();
    }

    ngOnInit() {
      this._apiData.getResourceRecords('enterprises').subscribe(data => {
        this.owners = data || [];
        this.filteredOwners = this.ownerCtrl.valueChanges
            .startWith(null)
            .map(id => this.filterOwners(id));
        this.requestBody[this.ownerField] = '';
      }, error => console.log(error));
    }

    filterOwners(id: number) {
      return id ? this.owners.filter((s: any) => new RegExp(`^${id}`, 'gi').test(s)) : this.owners;
    }

    ownerAttributeName() {
      return `${this.reverseAssociation['label'].replace('_', ' ')} (id)`
    }

    get ownerField() {
      return `${this.reverseAssociation['label']}_id`;
    }

    optionDetail(owner: Object) {
      let copy = {};
      Object.assign(copy, owner);
      ['id', 'created_at', 'updated_at'].forEach(key => delete copy[key]);
      return copy;
    }

}
