import { ApiProject } from './api-project.model';
import { ApiAttribute } from './api-attribute.model';
import { ApiAssociation } from './api-association.model';

let _ = require('lodash');
let inflector = require('lodash-inflection');

export class ApiResource {

    id: number;
    name: string;

    apiProjectId: number = null;

    apiAttributes: Array<ApiAttribute> = [];
    apiAssociations: Array<ApiAssociation> = [];
    reverseAssociations: Array<Object> = [];

    private _delete: boolean = null;
    private static _current: ApiResource;

    constructor(attributes: Object) {
        this.id = attributes['id'];
        this.name = attributes['name'];

        if (attributes.hasOwnProperty('api_project')) {
            this.apiProjectId = attributes['api_project']['id'];
        }

        if (attributes.hasOwnProperty('api_attributes')) {
            this.createApiAttributes(attributes['api_attributes']);
        }

        if (attributes.hasOwnProperty('api_associations')) {
            this.createApiAssociations(attributes['api_associations']);
        }

        if (attributes.hasOwnProperty('reverse_associations')) {
          this.reverseAssociations = attributes['reverse_associations']
        }
    }

    createApiAttributes(data: Array<Object>) {
        let apiAttribute;
        data.forEach((apiAttributeAttributes: Object) => {
            apiAttribute = new ApiAttribute(apiAttributeAttributes);
            apiAttribute.apiResourceId = this.id;
            this.apiAttributes.push(apiAttribute);
        });
    }

    createApiAssociations(data: Array<Object>) {
        let apiAssociation;
        data.forEach((apiAssociationAttributes: Object) => {
            apiAssociation = new ApiAssociation(apiAssociationAttributes);
            apiAssociation.apiResourceId = this.id;
            this.apiAssociations.push(apiAssociation);
        });
    }

    asApiRequestFormat() {
        let result = {};
        if (this.id) result['id'] = this.id;
        if (this.name) result['name'] = this.name;
        if (this.apiAssociations.length > 0) {
            result['api_associations_attributes'] = this.apiAssociations.map(association => association.asApiRequestFormat())
        }
        if (this.apiAttributes.length > 0) {
            result['api_attributes_attributes'] = this.apiAttributes.map(attribute => attribute.asApiRequestFormat())
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

    get tableName() {
      let downcased = this.name.toLowerCase();
      return inflector.pluralize(downcased);
    }

    get formattedName() {
      return this.name.toLowerCase();
    }

    static get current(): ApiResource {
        return this._current;
    }

    static set current(apiResource: ApiResource) {
        this._current = apiResource;
    }

    get allAtributeNames() {
      let result = ['id'].concat(this.apiAttributes.map(attr => attr.formattedName));
      result.push(...this.reverseAssociations.map(assoc => assoc['label'] + '_id'));
      return result;
    }
}
