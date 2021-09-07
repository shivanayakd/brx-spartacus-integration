import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSpartacusBanner]'
})
export class SpartacusBannerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
