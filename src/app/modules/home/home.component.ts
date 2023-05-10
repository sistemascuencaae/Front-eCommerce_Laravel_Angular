import { Component, OnInit } from '@angular/core';

declare var $: any;
declare function initPageEcommerce([]): any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
    //Inicializa todo lo que corresponde a la plantilla
    setTimeout(() => {
      initPageEcommerce($);
    }, 50);
  }

}
