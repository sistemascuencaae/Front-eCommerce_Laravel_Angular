import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CulqiService {

  constructor(
    public http: HttpClient,
  ) { }

  GETTOKENCULQI(data: any) {
    let headers = new HttpHeaders({ "Authorization": "Bearer pk_test_" });//KEY PUBLICO
    return this.http.post("https://secure.culqi.com/v2/tokens", data, { headers: headers });
  }

  SENDDATATOCULQI(data: any) {
    let headers = new HttpHeaders({ "Authorization": "Bearer sk_test_" });//KEY PUBLICO
    return this.http.post("https://api.culqi.com/v2/charges", data, { headers: headers });
  }
}