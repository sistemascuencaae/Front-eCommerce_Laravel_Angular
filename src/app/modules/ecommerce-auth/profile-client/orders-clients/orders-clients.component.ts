import { Component, Input } from '@angular/core';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-orders-clients',
  templateUrl: './orders-clients.component.html',
  styleUrls: ['./orders-clients.component.scss']
})
export class OrdersClientsComponent {
  @Input() listOrders: any = [];

  URL_BACKEND = URL_BACKEND;
  constructor() { }

  ngOnInit(): void {

    console.log(this.listOrders);
  }

}
