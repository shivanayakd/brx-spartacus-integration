import { Injectable } from "@angular/core";
import { EventService, RoutingService, TranslationService, WindowRef } from "@spartacus/core";
import { SearchBoxComponentService } from "@spartacus/storefront";
import { SpartacusSearchboxService } from "./spartacus-searchbox.service";

@Injectable({
  providedIn: 'root',
})
export class SpartacusSearchBoxComponentService extends SearchBoxComponentService {
  constructor(
    public searchService: SpartacusSearchboxService,
    protected routingService: RoutingService,
    protected translationService: TranslationService,
    protected winRef: WindowRef,
    protected eventService: EventService,
  ) {
    super(searchService, routingService, translationService, winRef, eventService);
  }
}
