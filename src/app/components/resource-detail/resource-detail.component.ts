import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiUser } from '../../models/api-user.model';
import { ApiResource } from '../../models/api-resource.model';
import { ApiAssociation } from '../../models/api-association.model';
import { ApiAttribute } from '../../models/api-attribute.model';

@Component({
    selector: 'resource-detail',
    templateUrl: './resource-detail.component.html'
})
export class ResourceDetailComponent {

    @Input() apiResource: ApiResource;

    onFormActionClick() {

    }


}
