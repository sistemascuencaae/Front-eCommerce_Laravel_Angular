import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth-profile/_services/auth.service';
import { CartShopsService } from 'src/app/modules/home/_services/cart-shops.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any = null;
  listCarts: any = [];

  TotalPrice: any = 0;
  constructor(
    public authService: AuthService,
    public router: Router,
    public _cartService: CartShopsService,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    console.log(this.user);
    this._cartService.listCartShop().subscribe((resp: any) => {
      // console.log(resp);
      resp.carts.data.forEach((element: any) => {
        this._cartService.changeCart(element);
      });;
    })
    this._cartService.currentDataCart$.subscribe((resp: any) => {
      // console.log(resp);
      this.listCarts = resp;
      this.TotalPrice = this.listCarts.reduce((sum: any, item: any) => sum + item.total, 0);
    })
  }
  removeItem(cart: any) {
    this._cartService.deleteCartShop(cart.id).subscribe();
    this._cartService.removeItemCart(cart);
  }
  isRouterActive() {
    return this.router.url == "" || this.router.url == "/" ? true : false;
  }
  logout() {
    this.authService.logout();
  }
}
