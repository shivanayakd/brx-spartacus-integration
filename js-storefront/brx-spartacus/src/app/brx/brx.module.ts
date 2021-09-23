import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrSdkModule} from '@bloomreach/ng-sdk';
import {environment} from '../../environments/environment';
import {SpartacusModule} from '../spartacus/spartacus.module';
import {BrxComponent, ENDPOINT} from './brx.component';
import {BannerComponent} from './components/banner/banner.component';
import {SpartacusBannerComponent} from './components/spartacus-banner/spartacus-banner.component';
import {SpartacusBannerDirective} from './components/spartacus-banner/spartacus-banner.directive';
import { SpartacusProductListComponent } from './components/spartacus-product-list/spartacus-product-list.component';
import { SpartacusProductListDirective } from './components/spartacus-product-list/spartacus-product-list.directive';
import { SpartacusSearchBoxComponent } from './components/spartacus-search-box/spartacus-search-box.component';
import { SpartacusSearchBoxDirective } from './components/spartacus-search-box/spartacus-search-box.directive';
import {IsExternalLinkPipe} from './pipes/is-external-link.pipe';
import {IsInternalLinkPipe} from './pipes/is-internal-link.pipe';
import {ParseUrlPipe} from './pipes/parse-url.pipe';
import { SpartacusSearchboxService } from './services/spartacus-searchbox.service';

@NgModule({
  declarations: [
    BannerComponent,
    SpartacusBannerComponent,
    IsExternalLinkPipe,
    IsInternalLinkPipe,
    ParseUrlPipe,
    BrxComponent,
    SpartacusBannerDirective,
    SpartacusProductListComponent,
    SpartacusProductListDirective,
    SpartacusSearchBoxComponent,
    SpartacusSearchBoxDirective,
  ],
  imports: [
    CommonModule,
    BrSdkModule,
    RouterModule,
    SpartacusModule,
  ],
  exports: [
    BrxComponent,
  ],
  providers: [
    { provide: ENDPOINT, useValue: environment.endpoint }
  ],
})
export class BrxModule {
}
