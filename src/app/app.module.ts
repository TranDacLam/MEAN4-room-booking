import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule, RequestOptions, Http } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'; // https://github.com/scttcper/ngx-toastr

import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';

import { AppComponent } from './app.component';
import { ShowErrorValidComponent } from './admin/components/show-error-valid/show-error-valid.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotAuthGuard } from './shared//guards/not-auth.guard';
import { AuthRequestOptions } from './shared/guards/auth-request';

@NgModule({
    declarations: [
        AppComponent,
        ShowErrorValidComponent,
        PageNotFoundComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AdminModule,
        PublicModule,
        AppRoutingModule,
        HttpModule,
        ReactiveFormsModule,
        FormsModule,
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
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
