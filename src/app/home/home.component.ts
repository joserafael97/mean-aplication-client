import { Component, OnInit } from '@angular/core';
import { Conta } from '../_models/conta.class';
import { AutenticacaoService } from '../_services/autenticacao.service';
import { Papel } from '../_models/enums/tipoUsuario.enum';
import { Funcionario } from '../_models/funcionario.class';
import { Avaliacacao } from '../_models/avaliacao.class';
import { FuncionarioService } from '../_services/funcionario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AvaliacaoService } from '../_services/avaliacao.service';
import { MatSnackBar } from '@angular/material';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: Conta;
  listaAvaliacao: Avaliacacao[];

  displayedColumns: string[] = ['data', 'descricao', 'status'];


  constructor(
    private autenticacaoService: AutenticacaoService,
    private funcionarioService: FuncionarioService,
    private avaliacaoService: AvaliacaoService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,


  ) {
    this.autenticacaoService.currentUser.subscribe(x => this.currentUser = x);
    this.inicializaAvaliacoes();
  }

  inicializaAvaliacoes() {
    this.spinner.show();
    this.listaAvaliacao = [];

    if (Papel.usuario === this.currentUser.papel) {

      this.funcionarioService.buscarFuncionarioPelaIdConta(String(this.currentUser.contaId)).subscribe(funcionario => {
        this.avaliacaoService.buscarAvaliacoesPeloIdFuncionario(String(funcionario._id)).subscribe(avaliacoes => {
          this.listaAvaliacao = [];
          for (let item of avaliacoes) {
            let avaliacao = new Avaliacacao();
            avaliacao.descricao = item.descricao;
            avaliacao.data = item.data;
            avaliacao.status = item.status
            avaliacao.id = item._id;
            this.listaAvaliacao.push(avaliacao);
          }

          this.spinner.hide();


        }, error => {
          this.openSnackBar("Ops ocorreu um erro.")
          this.spinner.hide();

        });

      },
        error => {
          this.openSnackBar("Ops ocorreu um erro.")
          this.spinner.hide();

        });

    } else if (Papel.gerente === this.currentUser.papel || Papel.bp === this.currentUser.papel) {
      this.avaliacaoService.todasAvaliacoes().subscribe(avaliacoes => {
        this.listaAvaliacao = [];
        for (let item of avaliacoes) {
          let avaliacao = new Avaliacacao();
          avaliacao.descricao = item.descricao;
          avaliacao.data = item.data;
          avaliacao.status = item.status
          avaliacao.id = item._id;
          this.listaAvaliacao.push(avaliacao);
        }

        this.spinner.hide();

      }, error => {
        this.spinner.hide();
        this.openSnackBar("Ops ocorreu um erro.")
      });

    } else if (Papel.metor === this.currentUser.papel) {
      this.listaAvaliacao = [];
      this.spinner.hide();

    }

  }

  ngOnInit() {
  }

  get isBpOuMentor() {
    return this.currentUser && (this.currentUser.papel === Papel.bp || this.currentUser.papel === Papel.metor);
  }

  openSnackBar(msg: string) {
    this._snackBar.openFromComponent(AlertComponent, {
      data: msg,
      verticalPosition: 'top',
      duration: 10 * 1000,
    });
  }


}
