import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiAttribute } from '../../models/api-attribute.model';
import { ApiValidation } from '../../models/api-validation.model';
import { ApiDataService } from '../../services/api-data.service';

@Component({
    selector: 'api-attribute',
    templateUrl: './api-attribute.component.html'
})
export class ApiAttributeComponent {

    @Input() apiAttribute: ApiAttribute;
    @Output() delete: EventEmitter<null> = new EventEmitter();

    static DB_TYPE_OPTIONS: Array<string> = [];
    static loading: boolean = false;

    constructor(private _apiData: ApiDataService) { }

    get options() {
        return ApiAttributeComponent.DB_TYPE_OPTIONS;
    }

    ngOnInit() {
        if (ApiAttributeComponent.loading) return;
        let storageItem = JSON.parse(localStorage.getItem('DB_TYPE_OPTIONS'));
        if (storageItem !== null) {
            ApiAttributeComponent.DB_TYPE_OPTIONS = storageItem;
            return;
        }
        ApiAttributeComponent.loading = true;
        this._apiData.fetchDbTypeOptions().subscribe(data => this.saveDbTypeOptions(data['result']), error => console.log(error));
    }

    emitDelete() {
        this.delete.emit();
    }

    addNewValidation() {
        this.apiAttribute.apiValidations.unshift(new ApiValidation({}));
    }

    deleteValidation(index: number) {
        let validation = this.apiAttribute.apiValidations[index];
        if (validation.id) {
            validation.markAsRemoved();
        } else {
            this.apiAttribute.apiValidations.splice(index, 1);
        }
    }

    saveDbTypeOptions(data: any) {
        ApiAttributeComponent.DB_TYPE_OPTIONS = data;
        localStorage.setItem('DB_TYPE_OPTIONS', JSON.stringify(data));
        ApiAttributeComponent.loading = false;
    }
}

