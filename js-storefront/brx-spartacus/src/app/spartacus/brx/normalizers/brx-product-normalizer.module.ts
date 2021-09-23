import { PRODUCT_NORMALIZER, PRODUCT_SEARCH_PAGE_NORMALIZER, PRODUCT_SUGGESTION_NORMALIZER } from '@spartacus/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrxProductSearchNormalizer } from './brx-product-search-normalizer';
import { BrxProductNormalizer } from './brx-product-normalizer';
import { BrxProductSuggestionNormalizer } from './brx-product-suggestion-normalizer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: PRODUCT_SEARCH_PAGE_NORMALIZER,
      useExisting: BrxProductSearchNormalizer,
      multi: true,
    },
    {
      provide: PRODUCT_NORMALIZER,
      useExisting: BrxProductNormalizer,
      multi: true,
    },
    {
      provide: PRODUCT_SUGGESTION_NORMALIZER,
      useExisting: BrxProductSuggestionNormalizer,
      multi: true,
    }
  ]
})
export class BrxProductNormalizerModule { }
