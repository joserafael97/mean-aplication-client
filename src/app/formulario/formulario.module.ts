import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule, CoreModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

import { SharedModule } from '../shared/shared.module'
import { AngularMaterialModule } from '../angular-material/angular-material.module'
import { FormularioComponent } from './formulario.component';
import { FormularioDetalhesComponent } from './formulario-detalhes/formulario-detalhes.component';
import { FomularioRoutingModule } from './formulario-route.module';
import { FormularioCadastroComponent } from './formulario-cadastro/formulario-cadastro.component';

@NgModule({
  declarations: [FormularioComponent, FormularioDetalhesComponent, FormularioCadastroComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    SharedModule,
    NgxSpinnerModule,
    AngularMaterialModule,
    FomularioRoutingModule
  ],
  entryComponents: []


})
export class FormularioModule { }
