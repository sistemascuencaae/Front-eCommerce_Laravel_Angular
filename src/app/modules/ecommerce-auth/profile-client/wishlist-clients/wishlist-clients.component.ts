import { Component } from '@angular/core';
import { CartShopsService } from 'src/app/modules/home/_services/cart-shops.service';

@Component({
  selector: 'app-wishlist-clients',
  templateUrl: './wishlist-clients.component.html',
  styleUrls: ['./wishlist-clients.component.scss']
})
export class WishlistClientsComponent {

  listWish: any = [];
  constructor(
    public _cartService: CartShopsService,
  ) { }


  ngOnInit(): void {
    this._cartService.currentDataWish$.subscribe((resp: any) => {
      console.log('WISHLISTS DEL INIT');
      console.log(resp);
      this.listWish = resp;
    })
  }
  deleteItem(wish: any) {
    this._cartService.deleteWishList(wish.id).subscribe();
    this._cartService.removeItemWish(wish);
  }

  addCart(wish: any) {
    let data = {
      user_id: wish.user.id,
      product_id: wish.product.id,
      type_discount: null,
      discount: null,
      cantidad: 1,
      product_size_id: wish.product_size_id ? wish.product_size_id : null,
      product_color_size_id: wish.product_color_size_id ? wish.product_color_size_id : null,
      code_cupon: null,
      code_discount: null,
      precio_unitario: wish.product.price_soles,
      subtotal: wish.product.price_soles,
      total: wish.product.price_soles * 1,
    }

    this._cartService.addCartShop(data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        alert(resp.message_text);
        return;
      }else{
        this._cartService.changeCart(resp.cart_shop);
        this.deleteItem(wish);
        alert("SE HA AGREGADO EL PRODUCTO AL CARRITO");
      }
    })
  }
}
