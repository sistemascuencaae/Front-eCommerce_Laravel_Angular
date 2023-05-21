import { Component } from '@angular/core';
import { HomeService } from '../_services/home.service';

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
}

