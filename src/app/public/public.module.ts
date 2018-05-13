import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';

import { PublicComponent } from './public.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  	imports: [
  		PublicRoutingModule
  	],
  	declarations: [
  		PublicComponent, 
  		HomeComponent, ProfileComponent
  	]
})
export class PublicModule { }
