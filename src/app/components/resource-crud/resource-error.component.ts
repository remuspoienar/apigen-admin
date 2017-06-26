import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'resource-error',
  templateUrl: './resource-error.component.html'
})
export class ResourceErrorComponent {

  @Input() error: Object;

  get errorKeys() {
      return Object.keys(this.error);
  }

  errorIsArray(key: string) {
    return this.error[key] instanceof(Array);
  }

  errorIsString(key: string) {
    return typeof(this.error[key]) == 'string';
  }

}
