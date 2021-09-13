import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductActions, ProductSearchService, SearchConfig, StateWithProduct } from '@spartacus/core';

@Injectable({
  providedIn: 'root'
})
export class SpartacusProductSearchService extends ProductSearchService {

  constructor(protected store: Store<StateWithProduct>) { 
    super(store)
  }

  search(query: string, searchConfig: SearchConfig): void {
    console.log('[*** Custom Product Search Service Just used for Logging]', query, searchConfig);
    this.store.dispatch(
      new ProductActions.SearchProducts({
        queryText: query,
        searchConfig: searchConfig,
      })
    );

  }
}
