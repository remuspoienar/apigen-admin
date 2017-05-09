import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiUser } from '../../models/api-user.model';
import { ApiResource } from '../../models/api-resource.model';
import { ApiAssociation } from '../../models/api-association.model';
import { ApiAttribute } from '../../models/api-attribute.model';

@Component({
    selector: 'api-resource',
    templateUrl: './api-resource.component.html'
})
export class ApiResourceComponent {

    @Input() apiResource: ApiResource;
    @Output() delete: EventEmitter<null> = new EventEmitter();

    emitDelete() {
        this.delete.emit();
    }

    addNewAssociation() {
        this.apiResource.apiAssociations.unshift(new ApiAssociation({}));
    }

    deleteAssociation(index: number) {
        this.apiResource.apiAssociations.splice(index, 1);
    }

    addNewAttribute() {
        this.apiResource.apiAttributes.unshift(new ApiAttribute({}));

    }

    deleteAttribute(index: number) {
        this.apiResource.apiAttributes.splice(index, 1);
    }

}

