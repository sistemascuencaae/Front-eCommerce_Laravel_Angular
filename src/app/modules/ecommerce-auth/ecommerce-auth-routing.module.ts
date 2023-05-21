import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcommerceAuthComponent } from './ecommerce-auth.component';
import { ShoppingCartsComponent } from './shopping-carts/shopping-carts.component';
import { authGuard } from '../auth-profile/_services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EcommerceAuthComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'carrito-de-compra',
        component: ShoppingCartsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceAuthRoutingModule { }
