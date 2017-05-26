import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiUser } from '../../models/api-user.model';
import { ApiResource } from '../../models/api-resource.model';
import { ApiAssociation } from '../../models/api-association.model';
import { ApiAttribute } from '../../models/api-attribute.model';

@Component({
    selector: 'attribute-input',
    templateUrl: './attribute-input.component.html'
})
export class AttributeInputComponent {

    @Input() apiAttribute: ApiAttribute;
    @Input() apiResource: ApiResource;


}
