import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileClientService } from '../../_services/profile-client.service';

@Component({
  selector: 'app-orders-review-add-clients',
  templateUrl: './orders-review-add-clients.component.html',
  styleUrls: ['./orders-review-add-clients.component.scss']
})
export class OrdersReviewAddClientsComponent {
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

  }

  back() {

  }

  getRating(value: any) {

  }

  save() {

  }

  update() {

  }
}
