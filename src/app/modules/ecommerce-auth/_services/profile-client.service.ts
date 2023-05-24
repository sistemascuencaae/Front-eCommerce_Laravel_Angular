import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth-profile/_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileClientService {

  constructor(
    public _authServices: AuthService,
    public http: HttpClient,
  ) { }

  listInforGeneralClient() {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this._authServices.token });
    let URL = URL_SERVICIOS + "/ecommerce/profile/home";
    return this.http.get(URL, { headers: headers });
  }

  updateProfile(data: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this._authServices.token });
    let URL = URL_SERVICIOS + "/ecommerce/profile/profile_update";
    return this.http.post(URL, data, { headers: headers });
  }

  // Review
  addReview(data: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this._authServices.token });
    let URL = URL_SERVICIOS + "/ecommerce/profile/reviews";
    return this.http.post(URL, data, { headers: headers });
  }

  updateReview(review_id: any, data: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this._authServices.token });
    let URL = URL_SERVICIOS + "/ecommerce/profile/reviews/" + review_id;
    return this.http.put(URL, data, { headers: headers });
  }
  //
}