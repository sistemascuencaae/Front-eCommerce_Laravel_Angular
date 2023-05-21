import { Component, OnInit } from '@angular/core';
import { HomeService } from './_services/home.service';

declare var $: any;
declare function initPageEcommerce([]): any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  sliders: any = [];
  group_categories_product: any = [];
  products_aletorio_a: any = [];
  products_aletorio_b: any = [];

  product_selected_modal: any;

  constructor(
    public _homeService: HomeService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      initPageEcommerce($);
    }, 50);
  }


}
