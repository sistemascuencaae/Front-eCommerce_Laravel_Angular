import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/modules/auth-profile/_services/auth.service';
import { CartShopsService } from 'src/app/modules/home/_services/cart-shops.service';

declare var $: any;
declare function loadModalDetailProduct(): any;
@Component({
  selector: 'app-c-detail-product',
  templateUrl: './c-detail-product.component.html',
  styleUrls: ['./c-detail-product.component.scss']
})
export class CDetailProductComponent {
  @Input() product_selected_modal: any;
  @Input() is_landing: boolean = false;
  color_size_selecteds: any = [];
  quantity: any = 0;

  product_size_selected: any = null;
  product_size_color_selected: any = null;
  constructor(
    public _cartService: CartShopsService,
    public _authService: AuthService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      setTimeout(() => {
        loadModalDetailProduct();
      }, 25);
      if (!this.is_landing) {
        $('.product_quickview').addClass('active');
        $('body').css('overflow-y', 'hidden');
      }
    }, 50);
  }

  selectedSize(size: any) {
    this.product_size_selected = size;
    this.color_size_selecteds = size.variaciones;
  }
  addColor(color_size: any) {
    // console.log(color_size);
    this.product_size_color_selected = color_size;
  }
  reduceQ() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }
  addQ() {
    this.quantity++;
  }

  addCart(product_selected_modal: any) {
    if (!this._authService.user) {
      alert("NECESITAS LOGUEARTE");
      return;
    }
    if (this.product_selected_modal.checked_inventario == 2) {//MULTIPLE
      if (!this.product_size_selected || !this.product_size_color_selected) {
        alert("NECESITAS INGRESAR UN TAMAÑO Y COLOR");
        return;
      }
      if (this.quantity <= 0) {
        alert("NECESITAS INGRESAR UNA CANTIDAD");
        return;
      }
    }
    if (this.product_selected_modal.checked_inventario == 1) {//UNITARIO
      if (this.quantity <= 0) {
        alert("NECESITAS INGRESAR UNA CANTIDAD");
        return;
      }
    }
    let data = {
      user_id: this._authService.user.id,
      product_id: this.product_selected_modal.id,
      type_discount: null,
      discount: null,
      cantidad: this.quantity,
      product_size_id: this.product_size_selected ? this.product_size_selected.id : null,
      product_color_size_id: this.product_size_color_selected ? this.product_size_color_selected.id : null,
      code_cupon: null,
      code_discount: null,
      precio_unitario: this.product_selected_modal.price_soles,
      subtotal: this.product_selected_modal.price_soles,
      total: this.product_selected_modal.price_soles * this.quantity,
    }
    this._cartService.addCartShop(data).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        alert(resp.message_text);
        return;
      } else {
        this._cartService.changeCart(resp.cart_shop);
      }
    })
  }

  addWish(product_selected_modal: any) {
    if (!this._authService.user) {
      alert("NECESITAS LOGUEARTE");
      return;
    }

    if (this.product_selected_modal.checked_inventario == 2) { //MULTIPLE
      if (!this.product_size_selected || !this.product_size_color_selected) {
        alert("NECESITAS INGRESAR UN TAMAÑO Y COLOR");
        return;
      }
    }

    let data = {
      user_id: this._authService.user.id,
      product_id: this.product_selected_modal.id,
      product_size_id: this.product_size_selected ? this.product_size_selected.id : null,
      product_color_size_id: this.product_size_color_selected ? this.product_size_color_selected.id : null,
    }

    this._cartService.addWishList(data).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        alert(resp.message_text);
        return;
      } else {
        this._cartService.changeWish(resp.wishlist);
        alert("SE HA AGREGADO EL PRODUCTO A LA LISTA DE DESEO");
      }
    })
  }
}
