import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, ProductSearchAdapter, ProductSearchPage, PRODUCT_SEARCH_PAGE_NORMALIZER, SearchConfig } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { BrxEndpointService } from '../../../brx/services/brx-endpoint.service';

const DEFAULT_SEARCH_CONFIG: SearchConfig = {
  pageSize: 20,
};

@Injectable({
  providedIn: 'root'
})
export class BrxProductSearchAdapter implements ProductSearchAdapter  {

  constructor(protected http: HttpClient,protected converter: ConverterService, protected brxendpointservice: BrxEndpointService) { }
  
  search(
    query: string,
    searchConfig: SearchConfig = DEFAULT_SEARCH_CONFIG
  ): Observable<ProductSearchPage> {
    console.log('[** Product Search Adapter - Custom Brx API Req---]', query, searchConfig);
    return this.http
      .get(this.getSearchEndpoint(query,searchConfig))
      .pipe(this.converter.pipeable(PRODUCT_SEARCH_PAGE_NORMALIZER));
  }

  loadSuggestions(
    term: string,
    pageSize: number = 3
  ): Observable<any[]> {
    return of()
  }

  protected getSearchEndpoint(
    query: string,
    searchConfig: SearchConfig
  ): string {
    return this.brxendpointservice.buildUrl(query,searchConfig);
  }

}
