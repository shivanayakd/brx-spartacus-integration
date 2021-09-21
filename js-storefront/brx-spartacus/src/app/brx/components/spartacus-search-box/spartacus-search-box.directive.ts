import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSpartacusSearchBox]'
})
export class SpartacusSearchBoxDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
