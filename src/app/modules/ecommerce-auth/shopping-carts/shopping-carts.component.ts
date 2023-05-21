import { Component } from '@angular/core';
import { CartShopsService } from '../../home/_services/cart-shops.service';

declare function alertDanger([]): any;
declare function alertSuccess([]): any;
@Component({
  selector: 'app-shopping-carts',
  templateUrl: './shopping-carts.component.html',
  styleUrls: ['./shopping-carts.component.scss']
})
export class ShoppingCartsComponent {

  listCarts: any = [];
  TotalPrice: any = 0;
  ConversationDolar: any = 3.8;

  cupones: any = null;
  constructor(
    public _cartService: CartShopsService,
  ) { }

  ngOnInit(): void {
    this._cartService.ToDolar().subscribe((resp: any) => {
      console.log(resp);
      this.ConversationDolar = resp.Cotizacion[0].Venta;
    })
    this._cartService.currentDataCart$.subscribe((resp: any) => {
      console.log(resp);
      this.listCarts = resp;
      this.TotalPrice = this.listCarts.reduce((sum: any, item: any) => sum + item.total, 0);
    })
  }

  deleteItem(cart: any) {
    this._cartService.deleteCartShop(cart.id).subscribe();
    this._cartService.removeItemCart(cart);
  }

  reduceQ(cart: any) {
    if (cart.cantidad > 1) {
      cart.cantidad--;
    }
    //price_unitario 60
    // subtotal 30
    // 90
    // let data = {
    //   cantidad: cart.cantidad,
    //   total: cart.subtotal*cart.cantidad,
    // };
    cart.total = cart.subtotal * cart.cantidad;
    this._cartService.updateCartShop(cart.id, cart).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        alert(resp.message_text);
        return;
      } else {
        this._cartService.changeCart(resp.cart_shop);
      }
    })
  }
  addQ(cart: any) {
    // if(){

    // }
    cart.cantidad++;
    // let data = {
    //   cantidad: cart.cantidad,
    //   total: cart.subtotal*cart.cantidad,
    // };
    cart.total = cart.subtotal * cart.cantidad;
    this._cartService.updateCartShop(cart.id, cart).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        alert(resp.message_text);
        return;
      } else {
        this._cartService.changeCart(resp.cart_shop);
      }
    })
  }

  applyCupon() {
    if (!this.cupones) {
      alert("NECESITAS INGRESAR UN CUPON");
      // alertDanger("NECESITAS INGRESAR UN CUPON");
      return;
    }
    this._cartService.applyCupon(this.cupones).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        alert(resp.message_text);
        // alertDanger(resp.message_text);
        return;
      }
      resp.carts.data.forEach((element: any) => {
        this._cartService.changeCart(element);
      });
      alert("SE PROCESO EL CUPON DE MANERA CORRECTA");
      // alertSuccess("SE PROCESO EL CUPON DE MANERA CORRECTA");
    });
  }
}
