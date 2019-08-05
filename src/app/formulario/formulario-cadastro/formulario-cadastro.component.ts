import { Component, OnInit, NgZone } from '@angular/core';
import { Formulario } from 'src/app/_models/formulario.class';
import { FormularioService } from '../../_services/formulario.service';
import { Pergunta } from 'src/app/_models/pergunta.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoFormulario } from 'src/app/_models/enums/tiposFormulario.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AlertComponent } from 'src/app/shared/alert/alert.component';


@Component({
  selector: 'app-formulario-cadastro',
  templateUrl: './formulario-cadastro.component.html',
  styleUrls: ['./formulario-cadastro.component.css']
})
export class FormularioCadastroComponent implements OnInit {

  formulario: Formulario;
  pergunta01: Pergunta;
  pergunta02: Pergunta;
  pergunta03: Pergunta;
  pergunta04: Pergunta;
  pergunta05: Pergunta;
  pergunta06: Pergunta;
  pergunta07: Pergunta;
  tiposFormularios = TipoFormulario;
  keys = Object.keys;

  formularioForm: FormGroup;

  constructor(
    private formularioService: FormularioService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private zone: NgZone,
    private _snackBar: MatSnackBar,
    private router: Router) {
    this.formulario = new Formulario();
  }

  ngOnInit() {
    this.createForm();
  }

  get form() { return this.formularioForm.controls; }


  createForm() {
    this.formularioForm = this.formBuilder.group({
      tipo: [this.formulario.tipo, Validators.required],
      pergunta1: ['', Validators.required],
      pergunta2: ['', Validators.required],
      pergunta3: ['', Validators.required],
      pergunta4: ['', Validators.required],
      pergunta5: ['', Validators.required],
      pergunta6: ['', Validators.required],
      pergunta7: ['', Validators.required],

    });
  }

  setInfomacoesPerguntas() {
    this.formulario.tipo = this.formularioForm.value.tipo;
    this.formulario.perguntas.push(new Pergunta(this.formularioForm.value.pergunta1));
    this.formulario.perguntas.push(new Pergunta(this.formularioForm.value.pergunta2));
    this.formulario.perguntas.push(new Pergunta(this.formularioForm.value.pergunta3));
    this.formulario.perguntas.push(new Pergunta(this.formularioForm.value.pergunta4));
    this.formulario.perguntas.push(new Pergunta(this.formularioForm.value.pergunta5));
    this.formulario.perguntas.push(new Pergunta(this.formularioForm.value.pergunta6));
    this.formulario.perguntas.push(new Pergunta(this.formularioForm.value.pergunta7));

  }


  cadastrar() {

    if (this.formularioForm.invalid) {
      return;
    }
    this.spinner.show();
    this.setInfomacoesPerguntas();
    this.formularioService.cadastrar(this.formulario).subscribe(data => {
      this.spinner.hide();
      this._snackBar.openFromComponent(AlertComponent, {
        data: 'Novo modelo de formulário criado com sucesso.',
        verticalPosition: 'top',
        duration: 10 * 1000,
      });
      this.zone.run(() => this.router.navigate(['formularios']));

    }, error => {
      this._snackBar.openFromComponent(AlertComponent, {
        data: error.message,
        verticalPosition: 'top',
        duration: 10 * 1000,
      });
    });

  }



}
