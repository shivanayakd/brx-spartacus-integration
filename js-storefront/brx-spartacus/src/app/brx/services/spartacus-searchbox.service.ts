import { Injectable } from "@angular/core";
import { ProductActions, SearchboxService, SearchConfig } from "@spartacus/core";
import { BrxSearchConfig } from "../models/brx-search-config.model";

@Injectable({
  providedIn: 'root',
})
export class SpartacusSearchboxService extends SearchboxService {
  /**
   * dispatch the search for the search box
   */
  search(query: string, searchConfig?: SearchConfig): void {
    this.store.dispatch(
      new ProductActions.SearchProducts(
        {
          queryText: query,
          searchConfig: { ...searchConfig, type: 'suggestion' } as BrxSearchConfig,
        },
        true
      )
    );
  }
}
