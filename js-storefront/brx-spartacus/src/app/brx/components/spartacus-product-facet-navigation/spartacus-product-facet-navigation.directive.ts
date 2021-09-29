import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSpartacusProductFacetNavigation]'
})
export class SpartacusProductFacetNavigationDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
