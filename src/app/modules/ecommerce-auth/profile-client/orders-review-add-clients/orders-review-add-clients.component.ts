import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileClientService } from '../../_services/profile-client.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-orders-review-add-clients',
  templateUrl: './orders-review-add-clients.component.html',
  styleUrls: ['./orders-review-add-clients.component.scss']
})
export class OrdersReviewAddClientsComponent {
  URL_BACKEND = URL_BACKEND;
  @Input() IS_FORM: any = false;
  @Input() sale_detail: any;
  @Output() Review: EventEmitter<any> = new EventEmitter();
  @Output() backView: EventEmitter<any> = new EventEmitter();

  review_selected: any = null;
  rating: any = 0;
  message: any = "";
  constructor(
    public _profileHomeService: ProfileClientService,
  ) { }

  ngOnInit(): void {
    this.review_selected = this.sale_detail.review;
    if (this.review_selected) {
      this.message = this.review_selected.message;
      this.rating = this.review_selected.rating;
    }
  }

  back() {
    this.IS_FORM = !this.IS_FORM;
    this.backView.emit(this.IS_FORM);
  }

  getRating(value: any) {
    this.rating = value;
  }

  save() {
    if (!this.message) {
      alert("NECESITAS INGRESAR UNA DESCRIPCIÓN ");
      return;
    }
    if (!this.rating) {
      alert("NECESITAS INGRESAR UN RATING");
      return;
    }

    let data = {
      product_id: this.sale_detail.product.id,
      sale_detail_id: this.sale_detail.id,
      message: this.message,
      rating: this.rating,
    };
    this._profileHomeService.addReview(data).subscribe((resp: any) => {
      console.log(resp);
      this.Review.emit({ review: resp.review, sale_detail_id: this.sale_detail.id });
      alert("LOS CAMBIOS SE HAN REGISTRADO CON EXITO LA RESEÑA");
    })
  }

  update() {
    if (!this.message) {
      alert("NECESITAS INGRESAR UNA DESCRIPCIÓN ");
      return;
    }
    if (!this.rating) {
      alert("NECESITAS INGRESAR UN RATING");
      return;
    }

    let data = {
      product_id: this.sale_detail.product.id,
      sale_detail_id: this.sale_detail.id,
      message: this.message,
      rating: this.rating,
    };
    this._profileHomeService.updateReview(this.review_selected.id, data).subscribe((resp: any) => {
      console.log(resp);
      this.Review.emit({ review: resp.review, sale_detail_id: this.sale_detail.id });
      alert("LOS CAMBIOS SE HAN REGISTRADO CON EXITO");
    })
  }
}
