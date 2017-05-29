import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiUser } from '../../models/api-user.model';
import { ApiResource } from '../../models/api-resource.model';
import { ApiAssociation } from '../../models/api-association.model';
import { ApiAttribute } from '../../models/api-attribute.model';

@Component({
    selector: 'attribute-input',
    templateUrl: './attribute-input.component.html'
})
export class AttributeInputComponent implements OnInit {

    @Input() apiAttribute: ApiAttribute;
    @Input() apiResource: ApiResource;
    @Input() requestBody: Object;

    ngOnInit() {
      if (!this.requestBody[this.apiAttribute.formattedName]) this.requestBody[this.apiAttribute.formattedName] = '';
    }


}
