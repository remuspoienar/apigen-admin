import { ApiAttribute } from './api-attribute.model';

export class ApiValidation {

    id: number;
    trait: string;
    advancedOptions: Object;

    apiAttributeId: number;

    private _delete: boolean = null;

    constructor(attributes: Object) {
        this.id = attributes['id'];
        this.trait = attributes['trait'];
        this.advancedOptions = JSON.parse(attributes['advanced_options'] || '{}');

        if (attributes.hasOwnProperty('api_attribute')) {
            this.apiAttributeId = attributes['api_attribute']['id'];
        }

    }

    asApiRequestFormat() {
        let result = {};
        if (this.id) result['id'] = this.id;
        if (this.trait) result['trait'] = this.trait;
        if (this.advancedOptions) result['advanced_options'] = JSON.stringify(this.advancedOptions);
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