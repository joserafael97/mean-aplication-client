
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormularioComponent } from './formulario.component';
import { FormularioDetalhesComponent } from './formulario-detalhes/formulario-detalhes.component';
import { FormularioCadastroComponent } from './formulario-cadastro/formulario-cadastro.component';


const routes: Routes = [
  {
    path: '',
    component: FormularioComponent,
  },

  {
    path: 'detalhes',
    component: FormularioDetalhesComponent,
  },

  {
    path: 'cadastrar-modelo',
    component: FormularioCadastroComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FomularioRoutingModule { }