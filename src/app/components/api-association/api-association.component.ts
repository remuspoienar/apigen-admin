import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiAssociation } from '../../models/api-association.model';
import { ApiProject } from '../../models/api-project.model';
import { ApiResource } from '../../models/api-resource.model';
let _ = require('lodash');
let inflector = require('lodash-inflection');

@Component({
    selector: 'api-association',
    templateUrl: './api-association.component.html'
})
export class ApiAssociationComponent {

    @Input() apiAssociation: ApiAssociation;
    @Input() apiResource: ApiResource;
    @Output() delete: EventEmitter<null> = new EventEmitter();

    get allResourceNames() {
        return ApiProject.current.apiResources.map(resource => resource.name);
    }

    get kindOptions(): Array<string> {
        return ["has_many", "has_one", "belongs_to"];
    }

    textForMandatory() {
      let label = this.apiAssociation.resourceLabel;
      if (label === undefined || label.length === 0) return 'MANDATORY';
      let otherLabel = this.apiResource.name.toLowerCase();
      return `Every ${inflector.singularize(label)} requires that ${this.articledWithSeparator(otherLabel, 'extra', false)} reference for this association exists`;
    }

    textForKind(kind: string) {
        let label = this.apiAssociation.resourceLabel;
        if (label === undefined || label.length === 0) return [{'text': '', 'value': ''}];
        let otherLabel = this.apiResource.name.toLowerCase();
        if(kind == 'has_many') {
            return `${this.articled(otherLabel, true)} has many ${inflector.pluralize(label)}`;
        } else if(kind === 'has_one') {
            return `${this.articled(otherLabel, true)} has one ${label}`;
        } else if (kind === 'belongs_to') {
            return `${this.articled(otherLabel, true)} belongs to a ${label}`;
        } else {
            return 'N/A';
        }

    }

    emitDelete() {
        this.delete.emit();
    }

    articled(name: string, capital: boolean = false) {
        let article = capital ? 'A' : 'a';
        if (name[0].match(/[aeiou]/)) article = article.concat('n');
        return article.concat(' ', name);
    }

    articledWithSeparator(name: string, separator: string, boolean = false) {
      let articled = this.articled(name, boolean);
      return articled.split(' ').join(` ${separator} `);
    }
}
