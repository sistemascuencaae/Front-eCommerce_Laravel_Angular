import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../_services/home.service';

@Component({
  selector: 'app-landing-product-detail',
  templateUrl: './landing-product-detail.component.html',
  styleUrls: ['./landing-product-detail.component.scss']
})
export class LandingProductDetailComponent {

  product_selected: any = null;
  slug_product: any = null;

  product_relateds: any = [];
  constructor(
    public _homeService: HomeService,
    public router: Router,
    public activeRouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((resp: any) => {
      this.slug_product = resp["slug"] || "";
    })
    this._homeService.detailProduct(this.slug_product).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        this.router.navigateByUrl("/");
      } else {
        this.product_selected = resp.product_detail;
        this.product_relateds = resp.product_relateds;
      }
    })
  }

}

