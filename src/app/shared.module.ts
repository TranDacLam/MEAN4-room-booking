import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { ShowErrorValidComponent } from './shared/components/show-error-valid/show-error-valid.component';

@NgModule({
  	imports: [
  		CommonModule,
  		ReactiveFormsModule,
  		FormsModule,
        DataTablesModule
  	],
  	declarations: [
        ShowErrorValidComponent
  	],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        DataTablesModule,
        ShowErrorValidComponent
    ]
})
export class SharedModule { }
