import { ApiResource } from './api-resource.model';

export class ApiAssociation {
    id: number;
    resourceName: string;
    resourceLabel: string;
    kind: string;
    mandatory: boolean;
    advancedOptions: Object;

    apiResourceId: number = null;

    private _delete: boolean = null;

    constructor(attributes: Object) {
        this.id = attributes['id'];
        this.resourceName = attributes['resource_name'];
        this.resourceLabel = attributes['resource_label'];
        this.kind = attributes['kind'];
        this.advancedOptions = JSON.parse(attributes['advanced_options'] || '{}');
        this.mandatory = attributes['mandatory'];

        if (attributes.hasOwnProperty('api_resource')) {
            this.apiResourceId = attributes['api_resource']['id'];
        }
    }

    asApiRequestFormat() {
        let result = {};
        if (this.id) result['id'] = this.id;
        if (this.resourceName) result['resource_name'] = this.resourceName;
        if (this.resourceLabel) result['resource_label'] = this.resourceLabel;
        if (this.kind) result['kind'] = this.kind;
        if (this.mandatory !== undefined ) result['mandatory'] = this.mandatory;
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
