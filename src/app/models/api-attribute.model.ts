import { ApiResource } from './api-resource.model';
import { ApiValidation } from './api-validation.model';

export class ApiAttribute {

    id: number;
    name: string;
    dbType: string;

    apiResourceId: number = null;

    apiValidations: Array<ApiValidation> = [];

    constructor(attributes: Object) {
        this.id = attributes['id'];
        this.name = attributes['name'];
        this.dbType = attributes['db_type'];

        if (attributes.hasOwnProperty('api_resource')) {
            this.apiResourceId = (new ApiResource(attributes['api_resource'])).id;
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
}