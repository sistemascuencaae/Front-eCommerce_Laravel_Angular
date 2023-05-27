import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LandingProductDetailComponent } from './landing-product-detail/landing-product-detail.component';
import { HomeInitialComponent } from './home-initial/home-initial.component';
import { ListsFilterProductsComponent } from './lists-filter-products/lists-filter-products.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: HomeInitialComponent,
      },
      {
        path: 'producto/:slug',
        component: LandingProductDetailComponent
      },
      {
        path: 'lista-de-productos-totales',
        component: ListsFilterProductsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
