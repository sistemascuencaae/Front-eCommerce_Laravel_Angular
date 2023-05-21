import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingProductDetailComponent } from './landing-product-detail/landing-product-detail.component';
import { HomeInitialComponent } from './home-initial/home-initial.component';


@NgModule({
  declarations: [
    HomeComponent,
    LandingProductDetailComponent,
    HomeInitialComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
