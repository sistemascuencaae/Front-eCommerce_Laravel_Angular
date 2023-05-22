import { Component } from '@angular/core';
import { CartShopsService } from '../../home/_services/cart-shops.service';
import { SalesService } from '../_services/sales.service';

declare function alertDanger([]): any;
declare function alertSuccess([]): any;
@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent {
  full_name: any = null;
  full_surname: any = null;
  company_name: any = null;
  county_region: any = null;
  direccion: any = null;
  city: any = null;
  zip_code: any = null;
  phone: any = null;
  email: any = null;

  listCarts: any = [];
  TotalPrice: any = 0;
  ConversationDolar: any = 3.8;

  listAdrees: any = [];
  address_selected: any = null;
  status_view: Boolean = false;
  constructor(
    public _cartService: CartShopsService,
    public _saleService: SalesService,
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
    this._saleService.listAddressUser().subscribe((resp: any) => {
      console.log(resp);
      this.listAdrees = resp.address;
      this.status_view = this.listAdrees.length == 0 ? true : false;
    })
  }
  selectAddress(addrr: any) {
    this.address_selected = addrr;
    this.full_name = addrr.full_name;
    this.full_surname = addrr.full_surname;
    this.company_name = addrr.company_name;
    this.county_region = addrr.county_region;
    this.direccion = addrr.direccion;
    this.city = addrr.city;
    this.zip_code = addrr.zip_code;
    this.phone = addrr.phone;
    this.email = addrr.email;
  }
  resetAddress() {
    this.address_selected = null;
    this.full_name = null;
    this.full_surname = null;
    this.company_name = null;
    this.county_region = null;
    this.direccion = null;
    this.city = null;
    this.zip_code = null;
    this.phone = null;
    this.email = null;
  }
  changeStatus() {
    this.status_view = !this.status_view;
  }
  save() {
    if (!this.full_name || !this.full_surname) {
      alert("NECESITAS INGRESAR EL NOMBRE Y APELLIDO DEL QUE RECIBE EL PAQUE O ENTREGA");
      return;
    }
    if (!this.county_region) {
      alert("NECESITAS INGRESAR EL PAIS O REGION");
      return;
    }
    if (!this.direccion) {
      alert("NECESITAS INGRESAR LA DIRECCIÓN DE ENTREGA");
      return;
    }
    if (!this.city || !this.zip_code) {
      alert("NECESITAS INGRESAR LA CIUDAD Y CODIGO POSTAL");
      return;
    }
    if (!this.phone || !this.email) {
      alert("NECESITAS INGRESAR EL TELEFONO Y EL CORREO ELECTRONICO");
      return;
    }

    if (this.address_selected) {
      this.updateAddress();
    } else {
      this.addAddress();
    }
  }

  addAddress() {
    let data = {
      full_name: this.full_name,
      full_surname: this.full_surname,
      company_name: this.company_name,
      county_region: this.county_region,
      direccion: this.direccion,
      city: this.city,
      zip_code: this.zip_code,
      phone: this.phone,
      email: this.email,
    }
    this._saleService.addAddressUser(data).subscribe((resp: any) => {
      console.log(resp);
      this.selectAddress(resp.address);
      this.listAdrees.unshift(resp.address);
      alert("LA DIRECCIÓN SE HA REGISTRADO CORRECTAMENTE");
    })
  }

  updateAddress() {
    let data = {
      full_name: this.full_name,
      full_surname: this.full_surname,
      company_name: this.company_name,
      county_region: this.county_region,
      direccion: this.direccion,
      city: this.city,
      zip_code: this.zip_code,
      phone: this.phone,
      email: this.email,
    }
    this._saleService.updateAddressUser(this.address_selected.id, data).subscribe((resp: any) => {
      console.log(resp);
      let INDEX = this.listAdrees.findIndex((item: any) => item.id == resp.address.id);
      this.listAdrees[INDEX] = resp.address;
      alert("LA DIRECCIÓN HA REGISTRADO CAMBIOS CORRECTAMENTE");
    })
  }

}
