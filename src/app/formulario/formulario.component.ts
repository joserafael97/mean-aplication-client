import { Component, OnInit } from '@angular/core';

import { FormularioService } from '../_services/formulario.service';
import { Formulario } from '../_models/formulario.class';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { AlertComponent } from '../shared/alert/alert.component';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  listaFormularios: Formulario[];

  displayedColumns: string[] = ['tipo', 'status', 'remover'];

  constructor(
    private formularioService: FormularioService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,

  ) {
    this.listaFormularios = []
    this.inicializaTabela()
  }

  inicializaTabela() {
    this.formularioService.todosFomularios().subscribe(data => {
      this.spinner.show();
      this.listaFormularios = []
      for (let form of data) {
        let formulario = new Formulario();
        formulario.descricao = form.descricao;
        formulario.tipo = form.tipo;
        formulario.ativo = form.ativo
        formulario.id = form._id;
        this.listaFormularios.push(formulario);
      }

      this.spinner.hide();


    });
  }

  ngOnInit() {

  }

  openDialog(idFormulario): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: "Deseja remover o formulário?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        this.formularioService.remover(String(idFormulario)).subscribe(data => {
          this.openSnackBar("Modelo de Formulário removido com sucesso.")
          this.inicializaTabela()
        },
          error => {
            this.openSnackBar(error)
            this.spinner.hide();

          });
      }
    }, error => {
      this.openSnackBar(error)
      this.spinner.hide();

    });
  }

  openSnackBar(msg: string) {
    this._snackBar.openFromComponent(AlertComponent, {
      data: msg,
      verticalPosition: 'top',
      duration: 10 * 1000,
    });
  }
}


