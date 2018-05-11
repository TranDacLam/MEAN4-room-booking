import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { HttpModule, RequestOptions, Http } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'; // https://github.com/scttcper/ngx-toastr

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { ShowErrorValidComponent } from './components/show-error-valid/show-error-valid.component';
import { AboutComponent } from './components/about/about.component';

import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotAuthGuard } from './shared//guards/not-auth.guard';

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        HomeComponent,
        ShowErrorValidComponent,
        AboutComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-full-width',
            maxOpened: 1,
            autoDismiss: true,
            timeOut: 5000
        }), // ToastrModule added
    ],
    providers: [
        AuthService,
        AuthGuard,
        NotAuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
