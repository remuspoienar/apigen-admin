import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiUser } from '../../models/api-user.model';
import { ApiResource } from '../../models/api-resource.model';
import { ApiAssociation } from '../../models/api-association.model';
import { ApiAttribute } from '../../models/api-attribute.model';
import { Permission } from '../../models/permission.model';

@Component({
    selector: 'api-resource',
    templateUrl: './api-resource.component.html'
})
export class ApiResourceComponent {

    @Input() apiResource: ApiResource;
    @Input() permissionsVisible: boolean;
    @Output() delete: EventEmitter<null> = new EventEmitter();

    emitDelete() {
        this.delete.emit();
    }

    addNewPermission() {
      this.apiResource.permissions.unshift(new Permission({}));
    }

    deletePermission(index: number) {
      let permission = this.apiResource.permissions[index];
      if (permission.id) {
          permission.markAsRemoved();
      } else {
          this.apiResource.permissions.splice(index, 1);
      }
    }

    addNewAssociation() {
        this.apiResource.apiAssociations.unshift(new ApiAssociation({}));
    }

    deleteAssociation(index: number) {
        let association = this.apiResource.apiAssociations[index];
        if (association.id) {
            association.markAsRemoved();
        } else {
            this.apiResource.apiAssociations.splice(index, 1);
        }
    }

    addNewAttribute() {
        this.apiResource.apiAttributes.unshift(new ApiAttribute({}));
    }

    deleteAttribute(index: number) {
        let attribute = this.apiResource.apiAttributes[index];
        if (attribute.id) {
            attribute.markAsRemoved();
        } else {
            this.apiResource.apiAttributes.splice(index, 1);
        }

    }

}
