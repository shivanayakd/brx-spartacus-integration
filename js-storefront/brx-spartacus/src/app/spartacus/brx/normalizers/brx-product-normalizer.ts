import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Injectable } from '@angular/core';
import { Converter, ConverterService, ImageType, Price, PriceType, Product, ProductSearchPage } from '@spartacus/core';

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
      price: this.normalizePrice(source.sale_price),
      priceRange: {maxPrice: source.price_range[0],minPrice: source.price_range[1]},
      averageRating: source.score,
      description: source.description,
      name: source.title,
      nameHtml: source.title,
      url: source.url,
      code: source.pid,
      stock: {
        stockLevelStatus: "inStock"
    },
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
    return target;
  }

  normalizePrice(val:any): Price {

    const currencySymbol: string = getCurrencySymbol(
      "USD",
      'narrow',
      'en'
    );

    const priceformatedval = formatCurrency(
      val,
      'en',
      currencySymbol,
      "USD"
    );
    
    return {
      currencyIso: "USD",
      formattedValue: priceformatedval,
      priceType: PriceType.BUY,
      value: val
  }

  }
}
