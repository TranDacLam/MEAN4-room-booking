import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component'
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  	imports: [
  		CommonModule,
    	AdminRoutingModule
  	],
  	declarations: [AdminComponent, ListUserComponent, DashboardComponent]
})
export class AdminModule { }