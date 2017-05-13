import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiValidation } from '../../models/api-validation.model';
import { ApiDataService } from '../../services/api-data.service';


@Component({
    selector: 'api-validation',
    templateUrl: './api-validation.component.html'
})
export class ApiValidationComponent implements OnInit {

    @Input() apiValidation: ApiValidation;
    @Output() delete: EventEmitter<null> = new EventEmitter();

    TRAIT_OPTIONS: Object = {};

    constructor(private _apiData: ApiDataService) { }

    get options() {
        return Object.keys(this.TRAIT_OPTIONS);
    }

    get traitFields() {
        return this.TRAIT_OPTIONS[this.apiValidation.trait]
    }

    ngOnInit() {
        let storageItem = JSON.parse(localStorage.getItem('TRAIT_OPTIONS'));
        if (storageItem !== null) {
            this.TRAIT_OPTIONS = storageItem;
            return;
        }
        this._apiData.fetchTraitOptions().subscribe(data => this.saveTraitOptions(data['result']), error => console.log(error));
    }

    emitDelete() {
        this.delete.emit();
    }

    saveTraitOptions(data: any) {
        this.TRAIT_OPTIONS = data;
        localStorage.setItem('TRAIT_OPTIONS', JSON.stringify(data));
    }
}

