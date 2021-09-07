import {Component, Inject, InjectionToken, OnInit, Optional} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {BrPageComponent} from '@bloomreach/ng-sdk';
import {Page} from '@bloomreach/spa-sdk';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {OutletPosition} from '@spartacus/storefront';
import {Request} from 'express';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {BannerComponent} from './components/banner/banner.component';
import {SpartacusBannerComponent} from './components/spartacus-banner/spartacus-banner.component';
import {HttpErrorResponse} from '@angular/common/http';
import { SpartacusProductListComponent } from './components/spartacus-product-list/spartacus-product-list.component';

export const ENDPOINT = new InjectionToken<string>('brXM API endpoint');

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'brx-spartacus',
  templateUrl: './brx.component.html',
})
export class BrxComponent implements OnInit {
  configuration: BrPageComponent['configuration'];

  outletPosition = OutletPosition;

  mapping = {
    Banner: BannerComponent,
    SpartacusBanner: SpartacusBannerComponent,
    SpartacusProductList: SpartacusProductListComponent,
  };

  page?: Page;

  brxHttpError?: HttpErrorResponse;

  private navigationEnd: Observable<NavigationEnd>;

  constructor(
    router: Router,
    @Inject(ENDPOINT) endpoint?: string,
    @Inject(REQUEST) @Optional() request?: Request,
  ) {
    this.configuration = {
      debug: true,
      endpoint,
      request,
      endpointQueryParameter: 'endpoint',
      path: router.url,
    } as BrxComponent['configuration'];

    this.navigationEnd = router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ) as Observable<NavigationEnd>;
  }

  ngOnInit(): void {
    this.navigationEnd.subscribe((event) => {
      this.configuration = {...this.configuration, path: event.url};
      this.brxHttpError = undefined;
    });
  }

  setVisitor(page?: Page): void {
    this.configuration.visitor = page?.getVisitor();
  }

  onBrxHttpError(error: HttpErrorResponse): void {
    this.brxHttpError = error;
  }
}
