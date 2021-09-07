import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CmsPageAdapter, CmsStructureModel, PageContext } from "@spartacus/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BrxCmsPageAdapter implements CmsPageAdapter {
  /**
   * @override returns the PMA data for the given context and converts
   * the data by any configured `CMS_PAGE_NORMALIZER`.
   */
  load(pageContext: PageContext): Observable<CmsStructureModel> {
    console.log('[BrxCmsPageAdapter.load]');
    console.log('[pageContext]: ', pageContext);
    return of({
      page: {
        slots: {},
      },
      components: [],
    });
  }
}
