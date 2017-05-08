import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiAssociation } from '../../models/api-association.model';

@Component({
    selector: 'api-association',
    templateUrl: './api-association.component.html'
})
export class ApiAssociationComponent {

    @Input() apiAssociation: ApiAssociation;
    @Output() delete: EventEmitter<null> = new EventEmitter();

    emitDelete() {
        this.delete.emit();
    }
}

