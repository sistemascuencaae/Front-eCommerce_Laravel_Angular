import { Component } from '@angular/core';
import { HomeService } from '../_services/home.service';
import { AuthService } from '../../auth-profile/_services/auth.service';
import { CartShopsService } from '../_services/cart-shops.service';

declare var $: any;
declare function hero_slider_active(): any;

@Component({
  selector: 'app-home-initial',
  templateUrl: './home-initial.component.html',
  styleUrls: ['./home-initial.component.scss']
})
export class HomeInitialComponent {
  sliders: any = [];
  group_categories_product: any = [];
  products_aletorio_a: any = [];
  products_aletorio_b: any = [];

  product_selected_modal: any;

  constructor(
    public _homeService: HomeService,
    public _authService: AuthService,
    public _cartService: CartShopsService,
  ) { }

  ngOnInit(): void {

    this._homeService.getHome().subscribe((resp: any) => {
      console.log(resp);
      this.sliders = resp.sliders;
      this.group_categories_product = resp.group_categories_product;
      this.products_aletorio_a = resp.products_aletorio_a;
      this.products_aletorio_b = resp.products_aletorio_b;
      setTimeout(() => {
        hero_slider_active();
      }, 50);
    });

  }

  openModal(products_aletorio: any) {
    this.product_selected_modal = null;
    setTimeout(() => {
      this.product_selected_modal = products_aletorio;
    }, 25);
  }

  getNewPriceS(price_soles: number, discount_g: any) {
    if (discount_g.type_discount == 1) { //%
      return price_soles - (price_soles * discount_g.discount * 0.01);
    }
    if (discount_g.type_discount == 2) { //PEN
      return price_soles - price_soles * discount_g.discount;
    }
    return 0;
  }

  addCart(product_selected_modal: any) {
    // if(!this._authService.user){
    //   alert("NECESITAS LOGUEARTE");
    //   return;
    // }
    // var product_size_selected = null;
    // var product_size_color_selected = null;
    // if(product_selected_modal.checked_inventario == 2){//MULTIPLE
    //   product_size_selected = product_selected_modal.sizes[0];
    //   product_size_color_selected = product_size_selected.variaciones[0];
    // }
    // var type_discount_g = null;
    // var discount_g = null;
    // var precio_uni_total = 0;
    // var code_discount_g = null;
    // if(product_selected_modal.discount_g){
    //   type_discount_g = product_selected_modal.discount_g.type_discount;
    //   discount_g = product_selected_modal.discount_g.discount;
    //   code_discount_g = product_selected_modal.discount_g.code;
    //   precio_uni_total = this.getNewPriceS(product_selected_modal.price_soles,product_selected_modal.discount_g);
    // }else{
    //   precio_uni_total = product_selected_modal.price_soles;
    // }
    // let data = {
    //   user_id: this._authService.user.id,
    //   product_id: product_selected_modal.id,
    //   type_discount: type_discount_g,
    //   discount: discount_g,
    //   cantidad: 1,
    //   product_size_id: product_size_selected ? product_size_selected.id : null,
    //   product_color_size_id: product_size_color_selected ? product_size_color_selected.id : null,
    //   code_cupon: null,
    //   code_discount: code_discount_g,
    //   precio_unitario: precio_uni_total,
    //   subtotal: precio_uni_total,
    //   total: precio_uni_total * 1,
    // }
    // this._cartService.addCartShop(data).subscribe((resp:any) => {
    //   console.log(resp);
    //   if(resp.message == 403){
    //     alert(resp.message_text);
    //     return;
    //   }else{
    //     this._cartService.changeCart(resp.cart_shop);
    //     alert("SE HA AGREADO EL PRODUCTO AL CARRITO");
    //   }
    // })
  }

  addWish(product_selected_modal: any) {
    // if(!this._authService.user){
    //   alert("NECESITAS LOGUEARTE");
    //   return;
    // }
    // var product_size_selected = null;
    // var product_size_color_selected = null;
    // if(product_selected_modal.checked_inventario == 2){//MULTIPLE
    //   product_size_selected = product_selected_modal.sizes[0];
    //   product_size_color_selected = product_size_selected.variaciones[0];
    // }
    // let data = {
    //   user_id: this._authService.user.id,
    //   product_id: product_selected_modal.id,
    //   product_size_id: product_size_selected ? product_size_selected.id : null,
    //   product_color_size_id: product_size_color_selected ? product_size_color_selected.id : null,
    // }
    // this._cartService.addWishList(data).subscribe((resp:any) => {
    //   console.log(resp);
    //   if(resp.message == 403){
    //     alert(resp.message_text);
    //     return;
    //   }else{
    //     this._cartService.changeWish(resp.wishlist);
    //     alert("SE HA AGREADO EL PRODUCTO A LA LISTA DE DESEO");
    //   }
    // })

  }
}
