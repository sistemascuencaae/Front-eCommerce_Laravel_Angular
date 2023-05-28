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

  // wishList: any = [];

  constructor(
    public _profileHomeService: ProfileClientService,
    public ativerouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // LLamada desde el boton wishlist a la ruta del componente wishlist
    this.ativerouter.queryParams.subscribe((resp: any) => {
      this.selected_menu = resp["selected_menu"];
    })
    this.user = this._profileHomeService._authServices.user;
    this._profileHomeService.listInforGeneralClient().subscribe((resp: any) => {
      if (this.selected_menu) {
        this.selectorMenu = this.selected_menu;
      } else {
        this.selectorMenu = 1;
      }
      this.user_selected = resp.user;
      this.listAdrees = resp.address;
      this.listOrders = resp.orders.data;
      this.listReviews = resp.reviews;
      // this.wishLists = resp.wishlists;
    })
  }
  selectedMenu(value: any) {
    this.selectorMenu = value;
  }
}
