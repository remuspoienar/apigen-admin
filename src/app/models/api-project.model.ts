import { ApiResource } from './api-resource.model';
import { ApiUser } from './api-user.model';
import { ApiDataService } from '../services/api-data.service';

export class ApiProject {

    id: number;
    name: string;
    createdById: number;
    createdAt: string;
    apiResources: Array<ApiResource> = [];

    constructor(attributes: Object) {
        this.id = attributes['id'];
        this.name = attributes['name'];
        this.createdAt = attributes['created_at'];

        if (attributes.hasOwnProperty('created_by')) {
            this.createdById = (new ApiUser(attributes['created_by'])).id;
        }

        if (attributes.hasOwnProperty('api_resources')) {
            this.createApiResources(attributes['api_resources']);
        }
    }

    createApiResources(data: Array<Object>) {
        let apiResource;
        data.forEach((apiResourceAttributes: Object) => {
            apiResource = new ApiResource(apiResourceAttributes);
            apiResource.apiProjectId = this.id;
            this.apiResources.push(apiResource);
        });

    }
}