import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getHome() {
    let URL = URL_SERVICIOS + "/ecommerce/home";
    return this.http.get(URL);
  }

  detailProduct(slug_product: any) {
    let URL = URL_SERVICIOS + "/ecommerce/detail-product/" + slug_product;
    return this.http.get(URL);
  }

  listProducts(data: any) {
    let URL = URL_SERVICIOS + "/ecommerce/list-products";
    return this.http.post(URL, data);
  }

  configInitialfilter() {
    let URL = URL_SERVICIOS + "/ecommerce/config_initial_filter";
    return this.http.get(URL);
  }
}
