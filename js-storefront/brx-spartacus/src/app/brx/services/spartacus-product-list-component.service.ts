import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService, LanguageService, RoutingService } from '@spartacus/core';
import { ProductListComponentService, ViewConfig } from '@spartacus/storefront';
import { SpartacusProductSearchService } from './spartacus-product-search.service';

@Injectable({
  providedIn: 'root'
})
export class SpartacusProductListComponentService extends ProductListComponentService {

  constructor( protected productSearchService: SpartacusProductSearchService,
    protected routing: RoutingService,
    protected activatedRoute: ActivatedRoute,
    protected currencyService: CurrencyService,
    protected languageService: LanguageService,
    protected router: Router,
    protected config: ViewConfig) { 
    super(productSearchService,routing,activatedRoute,currencyService,languageService,router,config)
  }
}
