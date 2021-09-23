import { SearchConfig } from "@spartacus/core";

export interface BrxSearchConfig extends SearchConfig {
  type?: SEARCH_TYPE_SEARCH | SEARCH_TYPE_SUGGESTION;
}

type SEARCH_TYPE_SEARCH = 'search';
type SEARCH_TYPE_SUGGESTION = 'suggestion';
