import { Injectable } from '@angular/core';
import { SearchConfig } from '@spartacus/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrxEndpointService {

  smEndPoint = environment.smEndPoint;
  acccountId = "account_id=6429";
  domainKey = "domain_key=brxsaas_eng01";
  authKey = "auth_key=rb7krhviimqez2j6";
  viewId = "view_id=";
  reqId = "request_id=1631132135486";
  brUid = "_br_uid_2=";
  reqType = "request_type=search";
  searchType = "search_type=keyword";
  url = "url=http%3A%2F%2Flocalhost%3A4000%2Fgraphql";
  refUrl = "ref_url=";
  fl = "fl=pid,title,brand,price,sale_price,promotions,thumb_image,sku_thumb_images,sku_swatch_images,sku_color_group,url,price_range,sale_price_range,description,is_live,score,skuid"
  relm = "realm=prod";
  rows = 5;
  start = 0;
  q = "q=nuts";
  facet = "facet=true";
  sort: string = "";
  currentPage: number = 0; 


  constructor() { }

  buildUrl(query: string,searchConfig: SearchConfig): string {
    const {pageSize,currentPage, sort} = searchConfig;
    this.sort = sort ? sort : 'reviews+desc';
    this.currentPage = currentPage ? +currentPage : 0;
    this.start = this.currentPage * this.rows;
    return `${this.smEndPoint}?${this.acccountId}&${this.domainKey}&${this.authKey}&${this.viewId}&${this.reqId}&${this.brUid}&${this.reqType}&${this.searchType}&${this.url}&${this.refUrl}&${this.fl}&${this.relm}&rows=${this.rows}&start=${this.start}&${this.q}&${this.facet}&sort=${sort ? sort : ''}`;
  }

  getPaginationDetails(total: number) {
    return {
      "currentPage": this.currentPage,
      "pageSize": this.rows,
      "sort": this.sort,
      "totalPages": Math.ceil(total/this.rows),
      "totalResults": total
    }
  }
}

