import { ApiResource } from './api-resource.model';
import { ApiValidation } from './api-validation.model';

export class ApiAttribute {

    id: number;
    name: string;
    dbType: string;

    apiResourceId: number = null;

    apiValidations: Array<ApiValidation> = [];

    private _delete: boolean = null;

    constructor(attributes: Object) {
        this.id = attributes['id'];
        this.name = attributes['name'];
        this.dbType = attributes['db_type'];

        if (attributes.hasOwnProperty('api_resource')) {
            this.apiResourceId = attributes['api_resource']['id'];
        }

        if (attributes.hasOwnProperty('api_validations')) {
            this.createApiValidations(attributes['api_validations']);
        }
    }

    createApiValidations(data: Array<Object>) {
        let apiValidation;
        data.forEach((apiValidationAttributes: Object) => {
            apiValidation = new ApiValidation(apiValidationAttributes);
            apiValidation.apiAttributeId = this.id;
            this.apiValidations.push(apiValidation);
        });
    }

    asApiRequestFormat() {
        let result = {};
        if (this.id) result['id'] = this.id;
        if (this.name) result['name'] = this.name;
        if (this.dbType) result['db_type'] = this.dbType;
        if (this.apiValidations.length > 0) {
            result['api_validations_attributes'] = this.apiValidations.map(validation => validation.asApiRequestFormat())
        }
        if (this._delete) result['_destroy'] = true;
        return result;
    }

    markAsRemoved() {
        this._delete = true;
    }

    get isMarkedAsDeleted() {
        return this._delete;
    }
}