import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { PublicComponent } from './public.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  	imports: [
  		CommonModule,
  		PublicRoutingModule,
  		ReactiveFormsModule,
  		FormsModule
  	],
  	declarations: [
  		PublicComponent, 
  		HomeComponent, 
  		ProfileComponent
  	]
})
export class PublicModule { }
