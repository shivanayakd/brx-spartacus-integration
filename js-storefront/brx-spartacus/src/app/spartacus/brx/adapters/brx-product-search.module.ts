import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchAdapter } from '@spartacus/core';
import { BrxProductSearchAdapter } from './brx-product-search-adapter';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: ProductSearchAdapter,
      useClass: BrxProductSearchAdapter,
    },
  ],
})
export class BrxProductSearchModule { }