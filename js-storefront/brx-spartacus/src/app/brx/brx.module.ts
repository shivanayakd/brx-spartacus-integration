import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrSdkModule } from '@bloomreach/ng-sdk';
import { environment } from '../../environments/environment';
import { SpartacusModule } from '../spartacus/spartacus.module';
import { BrxComponent, ENDPOINT } from './brx.component';
import { BannerComponent } from './components/banner/banner.component';
import { SpartacusBannerComponent } from './components/spartacus-banner/spartacus-banner.component';
import { SpartacusBannerDirective } from './components/spartacus-banner/spartacus-banner.directive';
import { SpartacusProductFacetNavigationComponent } from './components/spartacus-product-facet-navigation/spartacus-product-facet-navigation.component';
import { SpartacusProductFacetNavigationDirective } from './components/spartacus-product-facet-navigation/spartacus-product-facet-navigation.directive';
import { SpartacusProductListComponent } from './components/spartacus-product-list/spartacus-product-list.component';
import { SpartacusProductListDirective } from './components/spartacus-product-list/spartacus-product-list.directive';
import { SpartacusSearchBoxComponent } from './components/spartacus-search-box/spartacus-search-box.component';
import { SpartacusSearchBoxDirective } from './components/spartacus-search-box/spartacus-search-box.directive';
import { IsExternalLinkPipe } from './pipes/is-external-link.pipe';
import { IsInternalLinkPipe } from './pipes/is-internal-link.pipe';
import { ParseUrlPipe } from './pipes/parse-url.pipe';
import { SpartacusSearchboxService } from './services/spartacus-searchbox.service';
import { FooterComponent } from './templates/footer/footer.component';
import { HeaderComponent } from './templates/header/header.component';

@NgModule({
  declarations: [
    BannerComponent,
    SpartacusBannerComponent,
    IsExternalLinkPipe,
    IsInternalLinkPipe,
    ParseUrlPipe,
    BrxComponent,
    SpartacusBannerDirective,
    SpartacusProductFacetNavigationDirective,
    SpartacusProductFacetNavigationComponent,
    SpartacusProductListComponent,
    SpartacusProductListDirective,
    SpartacusSearchBoxComponent,
    SpartacusSearchBoxDirective,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [CommonModule, BrSdkModule, RouterModule, SpartacusModule],
  exports: [BrxComponent],
  providers: [{ provide: ENDPOINT, useValue: environment.endpoint }],
})
export class BrxModule {}
