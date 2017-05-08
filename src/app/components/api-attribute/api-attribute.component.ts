import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiAttribute } from '../../models/api-attribute.model';
import { ApiValidation } from '../../models/api-validation.model';

@Component({
    selector: 'api-attribute',
    templateUrl: './api-attribute.component.html'
})
export class ApiAttributeComponent {

    @Input() apiAttribute: ApiAttribute;
    @Output() delete: EventEmitter<null> = new EventEmitter();

    emitDelete() {
        this.delete.emit();
    }

    addNewValidation() {
        this.apiAttribute.apiValidations.unshift(new ApiValidation({}));
    }

    deleteValidation(index: number) {
        this.apiAttribute.apiValidations.splice(index, 1);
    }
}

