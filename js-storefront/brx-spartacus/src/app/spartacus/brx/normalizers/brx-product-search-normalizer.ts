import { BrxEndpointService } from '../../../brx/services/brx-endpoint.service';
import { Injectable } from '@angular/core';
import {
  Converter,
  ConverterService,
  Occ,
  ProductSearchPage,
  PRODUCT_NORMALIZER,
} from '@spartacus/core';

interface BloomreachFacet {
  count: number;
  crumb: string;
  cat_name: string;
  name: string;
  parent: string;
  cat_id: string;
  tree_path: string;
}

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

    const sort = source.sort ?? 'relevance';
    const queryList = source.query?.split(':');
    const query: string = queryList?.length < 2 ? `${source.query}:${sort}` : source.query;
    target.facets = Object.entries(source.facet_counts?.facet_fields ?? [])
      .map((facetEntry) => {
        const facetName = facetEntry[0];
        const values = (facetEntry[1] as BloomreachFacet[])
          .filter((value) => {
            const facetValue = value.cat_name ?? value.name;
            return query.indexOf(`${facetName}:${facetValue}`) < 0
          })
          .map((value) => {
            const facetValue = value.cat_name ?? value.name;
            return {
              count: value.count,
              name: facetValue,
              query : {
                query : {
                  value : `${query}:${facetName}:${facetValue}`,
                },
                url : `/search?q=${query}%3A${facetName}%2C+${encodeURIComponent(facetValue)}`,
              },
              selected: false
          }
        }) ?? [];

        return {
          category: false,
          multiSelect: true,
          name: facetName,
          values,
          visible: true
        }
      });

    target.breadcrumbs = [];
    for (let i = 2; i < queryList.length; i=i+2) {
      const removeQuery = query.replace(`:${queryList[i]}:${queryList[i+1]}`, '');
      target.breadcrumbs?.push({
        facetCode : queryList[i],
        facetName : queryList[i],
        facetValueCode : queryList[i+1],
        facetValueName : queryList[i+1],
        removeQuery : {
          query : {
              value : removeQuery,
          },
          url : `/search?q=${encodeURIComponent(removeQuery)}`
        }
      });
    }

    target.currentQuery = {
      query: {
        value: `${query}:`
      },
    }
    // Convert the Source to target
    target.sorts = src.sorts;
    target.pagination = this.brxEndpointService.getPaginationDetails(
      source.response.numFound
    );
    return target;
  }
}
