import { Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk';
import { BreakpointService, ProductFacetNavigationComponent } from '@spartacus/storefront';
import { SpartacusProductFacetNavigationDirective } from './spartacus-product-facet-navigation.directive';

@Component({
  selector: 'app-spartacus-product-facet-navigation',
  templateUrl: './spartacus-product-facet-navigation.component.html',
})
export class SpartacusProductFacetNavigationComponent implements OnInit {
  @Input() component!: BrComponent;
  @Input() page!: Page;

  @ViewChild(SpartacusProductFacetNavigationDirective, { static: true })
  wrappedComponent!: SpartacusProductFacetNavigationDirective;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private breakpointService: BreakpointService,
  ) { }

  ngOnInit(): void {
    this.renderWrappedProductList();
  }

  renderWrappedProductList(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ProductFacetNavigationComponent);
    const viewContainerRef = this.wrappedComponent.viewContainerRef;
    viewContainerRef.clear();

    const componentInjector = Injector.create({
      providers: [
        { provide: BreakpointService, useValue: this.breakpointService },
      ]
    });

    viewContainerRef.createComponent<ProductFacetNavigationComponent>(componentFactory, 0, componentInjector);
  }
}
