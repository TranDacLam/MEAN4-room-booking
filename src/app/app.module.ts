import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule, RequestOptions, Http } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'; // https://github.com/scttcper/ngx-toastr;

import { SharedModule } from './shared.module';
import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotAuthGuard } from './shared//guards/not-auth.guard';
import { AuthRequestOptions } from './shared/guards/auth-request';
import { ScrollTop } from './shared/common/scroll-top';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        AdminModule,
        PublicModule,
        AppRoutingModule,
        HttpModule,
        HttpClientModule,
        ToastrModule.forRoot({
            closeButton: true,
            positionClass: 'toast-top-right',
            maxOpened: 1,
            autoDismiss: true,
            timeOut: 5000,
            progressBar: true
        }), // ToastrModule added
    ],
    providers: [
        AuthService,
        AuthGuard,
        NotAuthGuard,
        {
            provide: RequestOptions, 
            useClass: AuthRequestOptions
        },
        ScrollTop
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
