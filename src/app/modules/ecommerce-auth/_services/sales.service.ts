import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth-profile/_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  constructor(
    public _authServices: AuthService,
    public http: HttpClient,
  ) { }

  // CHECKOUT - DIRECCION DEL CLIENTE
  listAddressUser() {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this._authServices.token });
    let URL = URL_SERVICIOS + "/ecommerce/checkout/address_user";
    return this.http.get(URL, { headers: headers });
  }
  addAddressUser(data: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this._authServices.token });
    let URL = URL_SERVICIOS + "/ecommerce/checkout/address_user";
    return this.http.post(URL, data, { headers: headers });
  }
  updateAddressUser(cart_id: any, data: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this._authServices.token });
    let URL = URL_SERVICIOS + "/ecommerce/checkout/address_user/" + cart_id;
    return this.http.put(URL, data, { headers: headers });
  }
  deleteAddressUser(cart_id: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this._authServices.token });
    let URL = URL_SERVICIOS + "/ecommerce/checkout/address_user/" + cart_id;
    return this.http.delete(URL, { headers: headers });
  }

}
