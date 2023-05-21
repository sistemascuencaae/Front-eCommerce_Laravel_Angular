import { Component } from '@angular/core';


declare var $: any;
declare function initPageEcommerce([]): any;
@Component({
  selector: 'app-ecommerce-auth',
  templateUrl: './ecommerce-auth.component.html',
  styleUrls: ['./ecommerce-auth.component.scss']
})
export class EcommerceAuthComponent {
  ngOnInit(): void {
    setTimeout(() => {
      initPageEcommerce($);
    }, 50);
  }
}
