import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ListMemberComponent } from './components/members/list-member/list-member.component';
import { FormMemberComponent } from './components/members/form-member/form-member.component';

import { AuthGuard } from './../shared/guards/auth.guard';

const adminRoutes: Routes = [
	{
	    path: '',
	    component: PublicComponent,
	    children: [
	      	{
	      		path: '',
	      		children: [
			      	{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
			      	{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
			      	{ path: 'member/list', component: ListMemberComponent, canActivate: [AuthGuard] },
			      	{ path: 'member/add', component: FormMemberComponent, canActivate: [AuthGuard] },
			      	{ path: 'member/edit/:id', component: FormMemberComponent, canActivate: [AuthGuard] },
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
export class PublicRoutingModule {}