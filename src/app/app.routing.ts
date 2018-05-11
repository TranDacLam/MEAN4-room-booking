import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotAuthGuard } from './shared/guards/not-auth.guard'

const routes: Routes = [
    {
        path: '',
        component: AboutComponent,
        canActivate: [NotAuthGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    }
];
// imports: [ RouterModule.forRoot(routes, { useHash: true })],
@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
