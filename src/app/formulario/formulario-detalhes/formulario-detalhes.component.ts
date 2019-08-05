import { Component, OnInit } from '@angular/core';

import { Resposta } from 'src/app/_models/enums/tipoResposta.enum';


@Component({
  selector: 'app-fomulario-detalhes',
  templateUrl: './formulario-detalhes.component.html',
  styleUrls: ['./formulario-detalhes.component.css']
})
export class FormularioDetalhesComponent implements OnInit {

  respostas = Resposta;
  keys = Object.keys;

  constructor() { }

  ngOnInit() {
  }

}
