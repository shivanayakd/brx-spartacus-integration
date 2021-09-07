import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrxModule } from './brx/brx.module';
import { SpartacusModule } from './spartacus/spartacus.module';
import { NewsPageComponent } from './pages/news-page/news-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SpartacusModule,
    BrowserTransferStateModule,
    BrxModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
