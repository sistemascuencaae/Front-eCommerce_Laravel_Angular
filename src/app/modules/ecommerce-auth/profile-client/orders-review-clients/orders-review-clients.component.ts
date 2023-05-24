import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-orders-review-clients',
  templateUrl: './orders-review-clients.component.html',
  styleUrls: ['./orders-review-clients.component.scss']
})
export class OrdersReviewClientsComponent {
  @Input() listReviews: any = [];
  IS_FORM: any = false;
  sale_detail: any;
  constructor() { }

  ngOnInit(): void {
  }
  changeView(sale_detail: any, value: any) {

  }

  addReview(value: any) {

  }
  backView(value: any) {

  }
}
