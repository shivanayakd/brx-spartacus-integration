import { Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild } from "@angular/core";
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk';
import { CmsSearchBoxComponent } from "@spartacus/core";
import { CmsComponentData, SearchBoxComponent } from "@spartacus/storefront";
import { of } from "rxjs";
import { SpartacusSearchBoxDirective } from "./spartacus-search-box.directive";

@Component({
  selector: 'app-spartacus-search-box',
  templateUrl: './spartacus-search-box.component.html',
})
export class SpartacusSearchBoxComponent implements OnInit {
  @Input() component!: BrComponent;
  @Input() page!: Page;

  @ViewChild(SpartacusSearchBoxDirective, { static: true })
  wrappedComponent!: SpartacusSearchBoxDirective;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    this.renderWrappedSearchBox();
  }

  renderWrappedSearchBox(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SearchBoxComponent);
    const viewContainerRef = this.wrappedComponent.viewContainerRef;
    viewContainerRef.clear();

    const {
      displayProductImages,
      displayProducts,
      displaySuggestions,
      maxProducts,
      maxSuggestions,
      minCharactersBeforeRequest
    } = this.component.getParameters<SearchBoxParams>();

    const componentProperties: CmsSearchBoxComponent = {
      maxSuggestions,
      maxProducts,
      displaySuggestions,
      displayProducts,
      displayProductImages,
      minCharactersBeforeRequest,
    };

    const componentInjector = Injector.create({
      providers: [
        { provide: CmsComponentData, useValue: { data$: of(componentProperties) } },
      ]
    });

    viewContainerRef.createComponent<SearchBoxComponent>(componentFactory, 0, componentInjector);
  }
}
