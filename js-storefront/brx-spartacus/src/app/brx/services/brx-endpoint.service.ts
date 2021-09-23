import { Injectable } from '@angular/core';
import { SearchConfig } from '@spartacus/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrxEndpointService {
  // Get Values Form Env
  smEndPoint = environment.smEndPoint;
  accountId = environment.accountId;
  domainKey = environment.domainKey;
  authKey = environment.authKey;
  smSuggestionEndPoint = environment.smSuggestionEndPoint;

  // Default parameters
  DEFAULT_PARAMS = {
    request_type: 'search',
    search_type: 'category',
    fl: [
      'pid',
      'title',
      'brand',
      'price',
      'sale_price',
      'promotions',
      'thumb_image',
      'sku_thumb_images',
      'sku_swatch_images',
      'sku_color_group',
      'url',
      'price_range',
      'sale_price_range',
      'description',
      'is_live',
      'score',
    ].join(','),
    realm: 'prod',
    facet: 'true',
  };

  brUid = ''; // Ned to grab from Cookie name is _br_uid_2
  rows = 12; // default page size as per Spartacus
  start = 0;
  query = ''; // By Default its empty but need to grab from Search box
  sort: string = '';
  currentPage: number = 0;

  // Still to configure
  viewId = '';
  refUrl = '';
  catalogViews = '';

  constructor() {}

  buildSearchUrl(query: string = '', searchConfig: SearchConfig): string {
    const { currentPage, sort } = searchConfig;
    this.sort = sort ? sort : '';
    this.currentPage = currentPage ? +currentPage : 0;
    this.start = this.currentPage * this.rows;
    this.query = query;

    const params = new URLSearchParams({
      account_id: this.accountId,
      domain_key: this.domainKey,
      auth_key: this.authKey,
      view_id: '',
      request_id: Date.now().toString(),
      _br_uid_2: this.brUid,
      url: window.location.href,
      ref_url: this.refUrl,
      ...this.DEFAULT_PARAMS,
      rows: this.rows.toString(),
      start: this.start.toString(),
      q: this.query,
      // sort: this.sort,
    });

    return `${this.smEndPoint}?${params.toString()}&sort=${this.sort}`;
  }

  getPaginationDetails(total: number) {
    return {
      currentPage: this.currentPage,
      pageSize: this.rows,
      sort: this.sort,
      totalPages: Math.ceil(total / this.rows),
      totalResults: total,
    };
  }

  setPageSize(size: number) {
    this.rows = size;
  }

  buildSuggestionUrl(term: string = ''): string {
    const params = new URLSearchParams({
      account_id: this.accountId,
      auth_key: this.authKey,
      request_id: new Date().getTime().toString(),
      _br_uid_2: this.brUid,
      url: window.location.href,
      ref_url: this.refUrl,
      request_type: 'suggest',
      rsp_fmt: 'v2',
      q: term,
    });

    if (this.catalogViews) {
      params.append('catalog_views', this.catalogViews);
      params.append('rsp_fmt', 'v2');
      return `${this.smSuggestionEndPoint}v2/suggest/?${params}`;
    }

    params.append('domain_key', this.domainKey);
    return `${this.smSuggestionEndPoint}v1/suggest/?${params}`;
  }
}
