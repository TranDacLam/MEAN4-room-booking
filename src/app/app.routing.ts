import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [{
        path: '',
        component: UsersComponent
    }
];
// imports: [ RouterModule.forRoot(routes, { useHash: true })],
@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
