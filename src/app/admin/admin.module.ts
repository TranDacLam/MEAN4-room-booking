import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component'
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  	imports: [
    	AdminRoutingModule
  	],
  	declarations: [AdminComponent, ListUserComponent, DashboardComponent]
})
export class AdminModule { }
