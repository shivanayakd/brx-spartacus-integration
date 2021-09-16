import { Injectable } from '@angular/core';
import { Converter, ConverterService, Occ, ProductSearchPage, PRODUCT_NORMALIZER } from '@spartacus/core';

@Injectable({
  providedIn: 'root'
})
export class BrxProductSearchNormalizer implements Converter<any, ProductSearchPage> {

  constructor(private converterService: ConverterService) {
  }

  convert(
    source: any,
    target: ProductSearchPage = {}
  ): ProductSearchPage {
    target = {
      ...target,
      ...(source as any),
    };

    const src:ProductSearchPage = {
      breadcrumbs: [],
      categoryCode: '',
      currentQuery: {},
      facets: [],
      freeTextSearch: '',
      keywordRedirectUrl: '',
      pagination: {
        "currentPage": 0,
        "pageSize": 12,
        "sort": "relevance",
        "totalPages": 15,
        "totalResults": 175
    },
      products: source.response.docs,
      sorts: [
        {
            "code": "relevance",
            "name": "Relevance",
            "selected": true
        },
        {
            "code": "topRated",
            "name": "Top Rated",
            "selected": false
        },
        {
            "code": "name-asc",
            "name": "Name (ascending)",
            "selected": false
        },
        {
            "code": "name-desc",
            "name": "Name (descending)",
            "selected": false
        },
        {
            "code": "price-asc",
            "name": "Price (lowest first)",
            "selected": false
        },
        {
            "code": "price-desc",
            "name": "Price (highest first)",
            "selected": false
        }
    ],
      spellingSuggestion: {}
    }
    
    // this.normalizeFacets(target);
    if (src.products) {
      target.products = src.products.map((data: any) =>
        this.converterService.convert(data, PRODUCT_NORMALIZER)
      );
    }

    target.sorts = src.sorts;
    target.pagination = src.pagination;

    console.log('[****Normalizer]', target);
    return target;
  }
}
