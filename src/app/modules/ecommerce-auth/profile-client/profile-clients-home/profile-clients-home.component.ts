import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileClientService } from '../../_services/profile-client.service';

@Component({
  selector: 'app-profile-clients-home',
  templateUrl: './profile-clients-home.component.html',
  styleUrls: ['./profile-clients-home.component.scss']
})
export class ProfileClientsHomeComponent {

  selectorMenu: any = 0;
  user: any;

  user_selected: any;
  listAdrees: any = [];
  listOrders: any = [];
  listReviews: any = [];
  selected_menu: any = null;

  constructor(
    public _profileHomeService: ProfileClientService,
    public ativerouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.user = this._profileHomeService._authServices.user;
    this._profileHomeService.listInforGeneralClient().subscribe((resp: any) => {
      console.log('respuesta listInfogeneralCliente');
      console.log(resp);
      this.user_selected = resp.user;
      this.listAdrees = resp.address;
      this.listOrders = resp.orders.data;
      this.listReviews = resp.reviews;
      console.log('this.listReviews');
      console.log(this.listReviews);
    })

  }
  selectedMenu(value: any) {
    this.selectorMenu = value;
    console.log(this.selectorMenu);
  }
}
