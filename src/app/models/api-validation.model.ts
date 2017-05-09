import { ApiAttribute } from './api-attribute.model';

export class ApiValidation {

    id: number;
    trait: string;
    advancedOptions: Object;

    apiAttributeId: number;

    constructor(attributes: Object) {
        this.id = attributes['id'];
        this.trait = attributes['trait'];
        this.advancedOptions = attributes['advanced_options'];

        if (attributes.hasOwnProperty('api_attribute')) {
            this.apiAttributeId = (new ApiAttribute(attributes['api_attribute'])).id;
        }

    }
}