import { BrxEndpointService } from './../../services/brx-endpoint.service';
import { Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk';
import { PageLayoutService, ProductListComponent, ProductListComponentService, ViewConfig } from '@spartacus/storefront';
import { SpartacusProductListComponentService } from '../../services/spartacus-product-list-component.service';
import { SpartacusProductListDirective } from './spartacus-product-list.directive';

@Component({
  selector: 'app-spartacus-product-list',
  templateUrl: './spartacus-product-list.component.html',
})
export class SpartacusProductListComponent implements OnInit {
  @Input() component!: BrComponent;
  @Input() page!: Page;

  @ViewChild(SpartacusProductListDirective, { static: true })
  wrappedComponent!: SpartacusProductListDirective;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private productListComponentService: SpartacusProductListComponentService,
    private pageLayoutService: PageLayoutService,
    private brxendpointservice: BrxEndpointService
  ) { }

  ngOnInit(): void {
    this.renderWrappedProductList();
  }

  renderWrappedProductList(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ProductListComponent);
    const viewContainerRef = this.wrappedComponent.viewContainerRef;
    viewContainerRef.clear();

    const { pagesize, infinitescrollActive, infinitescrollLimit, infinitescrollMore } = this.component.getParameters<ProductListParams>();

    this.brxendpointservice.setPageSize(pagesize);
    const scrollConfig: ViewConfig =  {
      view: {
        defaultPageSize: pagesize,
        infiniteScroll: {
          active: infinitescrollActive,
          productLimit: infinitescrollLimit,
          showMoreButton: infinitescrollMore,
        }
      }
    };

    //pagesize is provided by ProductListComponentService

    const componentInjector = Injector.create({
      providers: [
        { provide: PageLayoutService, useValue: this.pageLayoutService },
        { provide: ProductListComponentService, useValue: this.productListComponentService },
        { provide: ViewConfig, useValue: scrollConfig },
      ]
    });

    viewContainerRef.createComponent<ProductListComponent>(componentFactory, 0, componentInjector);
  }
}
