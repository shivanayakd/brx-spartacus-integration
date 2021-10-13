import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  Product,
  ProductSearchAdapter,
  ProductSearchPage,
  PRODUCT_NORMALIZER,
  PRODUCT_SEARCH_PAGE_NORMALIZER,
  PRODUCT_SUGGESTION_NORMALIZER,
  SearchConfig,
  Suggestion,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, pluck, take } from 'rxjs/operators';
import { BrxSearchConfig } from '../../../brx/models/brx-search-config.model';
import { BrxEndpointService } from '../../../brx/services/brx-endpoint.service';

const DEFAULT_SEARCH_CONFIG: BrxSearchConfig = {
  pageSize: 20,
  type: 'search',
};

@Injectable({
  providedIn: 'root',
})
export class BrxProductSearchAdapter implements ProductSearchAdapter {
  constructor(
    protected http: HttpClient,
    protected converter: ConverterService,
    protected brxEndpointService: BrxEndpointService
  ) {}

  search(
    query: string,
    searchConfig: BrxSearchConfig = DEFAULT_SEARCH_CONFIG
  ): Observable<ProductSearchPage> {
    console.log(
      '[** Product Search Adapter - Custom Brx API Req---]',
      query,
      searchConfig
    );
    if (searchConfig.type === 'suggestion') {
      return this.http.get(this.getSuggestionEndpoint(query)).pipe(
        pluck<any, Object[]>('response', 'products'),
        map((model: Object[]) => model.slice(0, searchConfig.pageSize)),
        this.converter.pipeableMany(PRODUCT_NORMALIZER),
        map<Product[], ProductSearchPage>((model: Product[]) => ({
          products: model,
        }))
      );
    }
    const searchQuery = query ? query.split(':')[0] : '';
    const url = this.getSearchEndpoint(searchQuery, searchConfig);

    return this.http.get(url).pipe(
      map((response: any) => {
        return {
          ...response,
          query,
          url,
          sort: searchConfig.sort,
        };
      }),
      this.converter.pipeable(PRODUCT_SEARCH_PAGE_NORMALIZER)
    );
  }

  loadSuggestions(
    term: string,
    pageSize: number = 3
  ): Observable<Suggestion[]> {
    return this.http.get(this.getSuggestionEndpoint(term)).pipe(
      pluck<any, Object[]>('response', 'suggestions'),
      map((model: Object[]) => model.slice(0, pageSize)),
      this.converter.pipeableMany(PRODUCT_SUGGESTION_NORMALIZER)
    );
  }

  protected getSearchEndpoint(
    query: string,
    searchConfig: SearchConfig
  ): string {
    return this.brxEndpointService.buildSearchUrl(query, searchConfig);
  }

  protected getSuggestionEndpoint(term: string): string {
    return this.brxEndpointService.buildSuggestionUrl(term);
  }
}
