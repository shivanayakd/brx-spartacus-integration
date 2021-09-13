import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, ProductSearchAdapter, ProductSearchPage, PRODUCT_SEARCH_PAGE_NORMALIZER, SearchConfig, Suggestion } from '@spartacus/core';
import { Observable, of } from 'rxjs';

const DEFAULT_SEARCH_CONFIG: SearchConfig = {
  pageSize: 20,
};

@Injectable({
  providedIn: 'root'
})
export class BrxProductSearchAdapter implements ProductSearchAdapter  {

  constructor(protected http: HttpClient,protected converter: ConverterService) { }

  search(
    query: string,
    searchConfig: SearchConfig = DEFAULT_SEARCH_CONFIG
  ): Observable<ProductSearchPage> {
    console.log('[** Product Search Adapter - Custom Brx API Req]');
    return this.http
      .get('https://core.dxpapi.com/api/v1/core/?account_id=6429&domain_key=brxsaas_eng01&auth_key=rb7krhviimqez2j6&view_id=&request_id=1631132135486&_br_uid_2=&request_type=search&search_type=keyword&url=http%3A%2F%2Flocalhost%3A4000%2Fgraphql&ref_url=&fl=pid%2Ctitle%2Cbrand%2Cprice%2Csale_price%2Cpromotions%2Cthumb_image%2Csku_thumb_images%2Csku_swatch_images%2Csku_color_group%2Curl%2Cprice_range%2Csale_price_range%2Cdescription%2Cis_live%2Cscore%2Cskuid&realm=prod&rows=10&start=0&q=nuts&facet=true')
      // .pipe(this.converter.pipeable(PRODUCT_SEARCH_PAGE_NORMALIZER));
  }

  loadSuggestions(
    term: string,
    pageSize: number = 3
  ): Observable<any[]> {
    return of()
  }

}
