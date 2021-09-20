import { PRODUCT_NORMALIZER, PRODUCT_SEARCH_PAGE_NORMALIZER } from '@spartacus/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrxProductSearchNormalizer } from './brx-product-search-normalizer';
import { BrxProductNormalizer } from './brx-product-normalizer';

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
    }
  ]
})
export class BrxProductNormalizerModule { }
