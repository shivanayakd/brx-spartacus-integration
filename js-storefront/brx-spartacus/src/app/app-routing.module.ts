import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewsPageComponent} from './pages/news-page/news-page.component';

const routes: Routes = [
  {path: 'news', component: NewsPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'corrected',
    initialNavigation: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
