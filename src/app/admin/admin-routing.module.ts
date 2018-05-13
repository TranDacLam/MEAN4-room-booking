import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';

const adminRoutes: Routes = [
	{
	    path: 'admin',
	    component: AdminComponent,
	    children: [
	      	{
	      		path: '',
	      		children: [
			      	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			      	{ path: 'dashboard', component: DashboardComponent },
			      	{ path: 'list-user', component: ListUserComponent }
			    ]
	      	}
	    ]
  	}
];

@NgModule({
  	imports: [
	    RouterModule.forChild(
	      	adminRoutes
	    )
  	],
  	exports: [
   	 	RouterModule
  	]
})
export class AdminRoutingModule {}