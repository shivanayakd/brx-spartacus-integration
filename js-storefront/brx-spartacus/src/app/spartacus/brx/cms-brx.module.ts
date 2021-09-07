import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CmsPageAdapter } from "@spartacus/core";
import { BrxCmsPageAdapter } from "./brx-cms-page.adapter";

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: CmsPageAdapter,
      useClass: BrxCmsPageAdapter,
    },
  ],
})
export class CmsBrxModule {}
