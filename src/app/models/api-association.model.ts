import { ApiResource } from './api-resource.model';

export class ApiAssociation {
    id: number;
    resourceName: string;
    resourceLabel: string;
    kind: string;
    advancedOptions: Object;

    apiResourceId: number = null;

    constructor(attributes: Object) {
        this.id = attributes['id'];
        this.resourceName = attributes['resource_name'];
        this.resourceLabel = attributes['resource_label'];
        this.kind = attributes['kind'];
        this.advancedOptions = attributes['advanced_options'];

        if (attributes.hasOwnProperty('api_resource')) {
            this.apiResourceId = (new ApiResource(attributes['api_resource'])).id;
        }
    }
}