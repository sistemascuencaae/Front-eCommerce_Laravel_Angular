import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcommerceAuthComponent } from './ecommerce-auth.component';
import { ShoppingCartsComponent } from './shopping-carts/shopping-carts.component';
import { authGuard } from '../auth-profile/_services/auth.guard';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { ProfileClientsHomeComponent } from './profile-client/profile-clients-home/profile-clients-home.component';

const routes: Routes = [
  {
    path: '',
    component: EcommerceAuthComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'carrito-de-compra',
        component: ShoppingCartsComponent,
      },
      {
        path: 'proceso-de-pago',
        component: CheckoutPaymentComponent,
      },
      {
        path: 'perfil-del-cliente',
        component: ProfileClientsHomeComponent,
      }
    ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceAuthRoutingModule { }
