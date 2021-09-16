import { Injectable } from '@angular/core';
import { Converter, ConverterService, ImageType, PriceType, Product, ProductSearchPage } from '@spartacus/core';

@Injectable({
  providedIn: 'root'
})
export class BrxProductNormalizer implements Converter<any, Product> {

  constructor(private converterService: ConverterService) {
  }

  convert(
    source: any,
    target: Product = {}
  ): Product {
    // target = {
    //   ...target,
    //   ...(source as any),
    // };

    // this.normalizeFacets(target);
    // if (src.products) {
    //   target.products = src.products.map((data: any) =>
    //     this.converterService.convert(data, PRODUCT_NORMALIZER)
    //   );
    // }

    // target.sorts = src.sorts;
    target = {
      price: source.sale_price,
      priceRange: {maxPrice: source.price_range[0],minPrice: source.price_range[1]},
      averageRating: source.score,
      description: source.description,
      name: source.title,
      nameHtml: source.title,
      url: source.url,
      images: {
        PRIMARY: {
            thumbnail: {
                format: "thumbnail",
                imageType: ImageType.PRIMARY,
                url: source.thumb_image
            },
            product: {
                format: "product",
                imageType: ImageType.PRIMARY,
                url: source.thumb_image
            }
        }
    }
    }

    // console.log('[****Product --- Normalizer]', target);
    return target;
  }
}
