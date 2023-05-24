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


  }
  deleteItem(wish: any) {

  }

  addCart(wish: any) {

  }
}
