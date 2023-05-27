import { Component } from '@angular/core';
import { HomeService } from '../_services/home.service';
import { AuthService } from '../../auth-profile/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartShopsService } from '../_services/cart-shops.service';

declare var $: any;

@Component({
  selector: 'app-lists-filter-products',
  templateUrl: './lists-filter-products.component.html',
  styleUrls: ['./lists-filter-products.component.scss']
})
export class ListsFilterProductsComponent {
  products: any = [];

  reviews: any = [];
  categories: any = [];
  sizes: any = [];
  colores: any = [];


  min_price: any = 0;
  max_price: any = 0;
  categories_array: any = [];
  review_selected: any = null;
  size_selected: any = null;
  color_selected: any = null;

  search_product: any;
  categorie_id: any;
  constructor(
    public _homeServices: HomeService,
    public _authService: AuthService,
    public _cartService: CartShopsService,
    public router: Router,
    public activedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.listProducts();
    this.listconfigInitialFilter();
    this.funcionScriptRange();
  }

  funcionScriptRange() {
    $("#slider-range").slider({
      range: true,
      min: 1,
      max: 50000,
      values: [0, 0],
      slide: (event: any, ui: any) => {
        this.min_price = ui.values[0];
        this.max_price = ui.values[1];
        $("#amount").val("PEN " + ui.values[0] + " - PEN " + ui.values[1]);
      },
      // para que no haga multiples peticiones al back usamos stop
      stop: () => { // Se ejecuta cuando haya terminado de elegir un rango de precio
        this.listProducts();
      }
    });
  }

  listconfigInitialFilter() {
    this._homeServices.configInitialfilter().subscribe((resp: any) => {
      console.log(resp);

      this.categories = resp.categories;
      this.colores = resp.colores;
      this.reviews = resp.reviews;
      this.sizes = resp.sizes;
    });
  }

  listProducts() {
    if (this.categorie_id) {
      this.categories_array.push(this.categorie_id);
    }
    let data = {
      categories: this.categories_array,
      review: this.review_selected,
      min_price: this.min_price,
      max_price: this.max_price,
      size_id: this.size_selected,
      color_id: this.color_selected,
      search_product: this.search_product,
    }
    this._homeServices.listProducts(data).subscribe((resp: any) => {
      console.log(resp);
      this.products = resp.products;

      if (this.categorie_id) {
        this.categories_array = [];
      }
      this.categorie_id = null;
    })
  }

  addSizeProduct(size: any) {
    this.size_selected = size.name;
    // console.log(this.size_selected);
    this.listProducts();
  }

  addColorProduct(color: any) {
    this.color_selected = color.id;
    // console.log(this.color_selected);
    this.listProducts();
  }

  addCategorie(categorie: any) {
    let INDEX = this.categories_array.findIndex((item: any) => item == categorie.id);
    if (INDEX != -1) {
      this.categories_array.splice(INDEX, 1);
    } else {
      this.categories_array.push(categorie.id);
    }
    this.listProducts();
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

  getCountReview(value: any) {
    let REVIEW_S = this.reviews.find((item: any) => item.rating == value);
    if (REVIEW_S) {
      return REVIEW_S.total;
    }
    return 0;
  }

  selectedReview(value: any) {
    this.review_selected = value;
    console.log(this.review_selected);
    this.listProducts();
  }

  addCart(product_selected_modal: any) {
    if (!this._authService.user) {
      alert("NECESITAS LOGUEARTE");
      return;
    }
    var product_size_selected = null;
    var product_size_color_selected = null;

    if (product_selected_modal.checked_inventario == 2) {//MULTIPLE
      product_size_selected = product_selected_modal.sizes[0];
      product_size_color_selected = product_size_selected.variaciones[0];
    }

    var type_discount_g = null;
    var discount_g = null;
    var precio_uni_total = 0;
    var code_discount_g = null;

    if (product_selected_modal.discount_g) {

      type_discount_g = product_selected_modal.discount_g.type_discount;
      discount_g = product_selected_modal.discount_g.discount;
      code_discount_g = product_selected_modal.discount_g.code;

      precio_uni_total = this.getNewPriceS(product_selected_modal.price_soles, product_selected_modal.discount_g);
    } else {

      precio_uni_total = product_selected_modal.price_soles;

    }

    let data = {
      user_id: this._authService.user.id,
      product_id: product_selected_modal.id,
      type_discount: type_discount_g,
      discount: discount_g,
      cantidad: 1,
      product_size_id: product_size_selected ? product_size_selected.id : null,
      product_color_size_id: product_size_color_selected ? product_size_color_selected.id : null,
      code_cupon: null,
      code_discount: code_discount_g,
      precio_unitario: precio_uni_total,
      subtotal: precio_uni_total,
      total: precio_uni_total * 1,
    }

    this._cartService.addCartShop(data).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        alert(resp.message_text);
        return;
      } else {
        this._cartService.changeCart(resp.cart_shop);
        alert("SE HA AGREADO EL PRODUCTO AL CARRITO");
      }
    })
  }

  addWish(product_selected_modal: any) {
    if (!this._authService.user) {
      alert("NECESITAS LOGUEARTE");
      return;
    }

    var product_size_selected = null;
    var product_size_color_selected = null;

    if (product_selected_modal.checked_inventario == 2) {//MULTIPLE
      product_size_selected = product_selected_modal.sizes[0];
      product_size_color_selected = product_size_selected.variaciones[0];
    }

    let data = {
      user_id: this._authService.user.id,
      product_id: product_selected_modal.id,
      product_size_id: product_size_selected ? product_size_selected.id : null,
      product_color_size_id: product_size_color_selected ? product_size_color_selected.id : null,
    }

    this._cartService.addWishList(data).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        alert(resp.message_text);
        return;
      } else {
        this._cartService.changeWish(resp.wishlist);
        alert("SE HA AGREADO EL PRODUCTO A LA LISTA DE DESEO");
      }
    })

  }
}
