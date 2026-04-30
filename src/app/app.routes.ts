import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { LinksComponent } from './links/links.component';
import { HowToSearchComponent } from './how-to-search/how-to-search.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'links', component: LinksComponent },
      { path: 'how-to-search', component: HowToSearchComponent }
    ]
  }
];