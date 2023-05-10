import { Component, OnInit } from '@angular/core';

declare var $: any;
declare function initPageEcommerce([]): any;
@Component({
  selector: 'app-auth-profile',
  templateUrl: './auth-profile.component.html',
  styleUrls: ['./auth-profile.component.scss']
})
export class AuthProfileComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
    //Inicializa todo lo que corresponde a la plantilla
    setTimeout(() => {
      initPageEcommerce($);
    }, 50);
  }
}
