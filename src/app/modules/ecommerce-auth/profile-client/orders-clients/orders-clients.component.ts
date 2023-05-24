import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-orders-clients',
  templateUrl: './orders-clients.component.html',
  styleUrls: ['./orders-clients.component.scss']
})
export class OrdersClientsComponent {
  @Input() listOrders: any = [];
  constructor() { }

  ngOnInit(): void {

    console.log(this.listOrders);
  }

}
