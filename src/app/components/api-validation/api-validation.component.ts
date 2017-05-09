import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiValidation } from '../../models/api-validation.model';

@Component({
    selector: 'api-validation',
    templateUrl: './api-validation.component.html'
})
export class ApiValidationComponent {

    @Input() apiValidation: ApiValidation;
    @Output() delete: EventEmitter<null> = new EventEmitter();

    emitDelete() {
        this.delete.emit();
    }
}

