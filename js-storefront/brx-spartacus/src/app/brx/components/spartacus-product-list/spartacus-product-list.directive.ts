import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSpartacusProductList]'
})
export class SpartacusProductListDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
