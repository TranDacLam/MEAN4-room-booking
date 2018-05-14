import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { PublicComponent } from './public.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ListMemberComponent } from './components/members/list-member/list-member.component';
import { FormMemberComponent } from './components/members/form-member/form-member.component';

@NgModule({
  	imports: [
  		CommonModule,
  		PublicRoutingModule,
  		ReactiveFormsModule,
  		FormsModule,
      DataTablesModule
  	],
  	declarations: [
  		PublicComponent, 
  		HomeComponent, 
  		ProfileComponent, 
        ListMemberComponent, 
        FormMemberComponent
  	]
})
export class PublicModule { }
