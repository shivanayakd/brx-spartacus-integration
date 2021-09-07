import { Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { Component as BrComponent, Document, ImageSet, Page } from '@bloomreach/spa-sdk';
import { CmsBannerComponent } from '@spartacus/core';
import { BannerComponent, CmsComponentData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { SpartacusBannerDirective } from './spartacus-banner.directive';

@Component({
  selector: 'app-spartacus-banner',
  templateUrl: './spartacus-banner.component.html',
})
export class SpartacusBannerComponent implements OnInit {
  @Input() component!: BrComponent;
  @Input() page!: Page;

  @ViewChild(SpartacusBannerDirective, { static: true })
  wrappedComponent!: SpartacusBannerDirective;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    this.renderWrappedBanner();
  }

  renderWrappedBanner(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BannerComponent);
    const viewContainerRef = this.wrappedComponent.viewContainerRef;
    viewContainerRef.clear();

    const componentProperties: CmsBannerComponent = {
      headline: this.data?.title,
      content: this.page.rewriteLinks(this.data?.content.value ?? ''),
      media: {
        url: this.image?.getOriginal()?.getUrl(),
      }
    };

    const componentInjector = Injector.create({
      providers: [
        { provide: CmsComponentData, useValue: { data$: of(componentProperties) } },
      ]
    });

    viewContainerRef.createComponent<BannerComponent>(componentFactory, 0, componentInjector);
  }

  get document(): Document | undefined {
    const { document } = this.component.getModels<DocumentModels>();

    return document && this.page.getContent<Document>(document);
  }

  get data(): DocumentData | undefined {
    return this.document?.getData<DocumentData>();
  }

  get image(): ImageSet | undefined {
    return this.data?.image && this.page.getContent<ImageSet>(this.data.image);
  }

  get link(): Document {
    return this.data?.link && this.page.getContent<Document>(this.data.link);
  }
}
