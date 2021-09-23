import { BrxEndpointService } from '../../../brx/services/brx-endpoint.service';
import { Injectable } from '@angular/core';
import {
  Converter,
  ConverterService,
  Occ,
  ProductSearchPage,
  PRODUCT_NORMALIZER,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class BrxProductSearchNormalizer
  implements Converter<any, ProductSearchPage>
{
  constructor(
    private converterService: ConverterService,
    private brxEndpointService: BrxEndpointService
  ) {}

  convert(source: any, target: ProductSearchPage = {}): ProductSearchPage {
    target = {
      ...target,
      ...(source as any),
    };

    const src: ProductSearchPage = {
      breadcrumbs: [],
      categoryCode: '',
      currentQuery: {},
      facets: [],
      freeTextSearch: '',
      keywordRedirectUrl: '',
      pagination: {},
      products: source.response.docs,
      sorts: [
        {
          code: '',
          name: 'Relevance',
          selected: true,
        },
        {
          code: 'reviews+desc',
          name: 'Top Rated',
          selected: false,
        },
        {
          code: 'title+asc',
          name: 'Name (ascending)',
          selected: false,
        },
        {
          code: 'title+desc',
          name: 'Name (descending)',
          selected: false,
        },
        {
          code: 'price+asc',
          name: 'Price (lowest first)',
          selected: false,
        },
        {
          code: 'price+desc',
          name: 'Price (highest first)',
          selected: false,
        },
      ],
      spellingSuggestion: {},
    };

    if (src.products) {
      target.products = src.products.map((data: any) =>
        this.converterService.convert(data, PRODUCT_NORMALIZER)
      );
    }

    // Convert the Source to target
    target.sorts = src.sorts;
    target.pagination = this.brxEndpointService.getPaginationDetails(
      source.response.numFound
    );
    return target;
  }
}
