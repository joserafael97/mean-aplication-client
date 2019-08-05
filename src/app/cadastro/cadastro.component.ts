import { Component, OnInit, NgZone } from '@angular/core';
import { FuncionarioService } from '../_services/funcionario.service';
import { Cargo } from 'src/app/_models/enums/cargo.enum';
import { Nivel } from 'src/app/_models/enums/nivel.enum';
import { Papel } from 'src/app/_models/enums/tipoUsuario.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/_models/funcionario.class';
import { Conta } from 'src/app/_models/conta.class';
import { DevemSerIguais } from 'src/app/_helpers/valores-iguais.validator';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { MatSnackBar } from '@angular/material';
import { AutenticacaoService } from '../_services/autenticacao.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cargos = Cargo;
  keys = Object.keys;
  niveis = Nivel
  funcionarioForm: FormGroup;
  submetido = false;
  nivelItemDesativado = true
  listaNiveis = [];
  private funcionario = new Funcionario(new Conta())


  constructor(
    private funcionarioService: FuncionarioService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private zone: NgZone,
    private autenticacaoService: AutenticacaoService,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.createForm(this.funcionario);
  }

  get form() { return this.funcionarioForm.controls; }

  createForm(funcionario: Funcionario) {
    this.funcionarioForm = this.formBuilder.group({
      nome: [funcionario.nome, Validators.required],
      contratacao: [funcionario.contratacao, Validators.required],
      nivel: [funcionario.nivel, Validators.required],
      cargo: [funcionario.cargo, Validators.required],
      username: [funcionario.conta.username, Validators.required],
      senha: [funcionario.conta.senha, [Validators.required, Validators.minLength(6)]],
      confirmacaoSenha: ['', [Validators.required, Validators.minLength(6)]]

    }, {
        validator: DevemSerIguais('senha', 'confirmacaoSenha')
      });
  }

  validaNivel(event) {
    this.listaNiveis = [];
    for (const value in Nivel) {
      this.listaNiveis.push(Nivel[value])
    }

    if (Cargo.estagiario === event.value) {
      const index = this.listaNiveis.indexOf(Nivel.naoAplica);
      this.listaNiveis.splice(index, 1);
      this.nivelItemDesativado = false

    } else if (Cargo.desenvolvedorJunior === event.value) {
      let index = this.listaNiveis.indexOf(Nivel.naoAplica);
      this.listaNiveis.splice(index, 1);
      index = this.listaNiveis.indexOf(Nivel.nivel4);
      this.listaNiveis.splice(index, 1);
      index = this.listaNiveis.indexOf(Nivel.nivel3);
      this.listaNiveis.splice(index, 1);
      this.nivelItemDesativado = false

    } else if (Cargo.desenvolvedorPleno === event.value) {
      let index = this.listaNiveis.indexOf(Nivel.naoAplica);
      this.listaNiveis.splice(index, 1);
      index = this.listaNiveis.indexOf(Nivel.nivel4);
      this.listaNiveis.splice(index, 1);
      this.nivelItemDesativado = false

    } else if (Cargo.gerente === event.value || Cargo.businessParter === event.value || Cargo.mentor === event.value) {
      this.listaNiveis = [Nivel.naoAplica]
      this.nivelItemDesativado = false
    }
  }

  setInformacoesFuncionario() {
    this.funcionario.nome = this.funcionarioForm.value.nome;
    this.funcionario.conta.username = this.funcionarioForm.value.username;
    this.funcionario.conta.senha = this.funcionarioForm.value.senha;
    this.funcionario.cargo = this.funcionarioForm.value.cargo;
    this.funcionario.nivel = this.funcionarioForm.value.nivel;
    this.funcionario.contratacao = this.funcionarioForm.value.contratacao;
    this.funcionario.conta.papel = this.setPapelConta(this.funcionarioForm.value.cargo);
  }

  setPapelConta(cargo) {
    if (cargo === Cargo.desenvolvedorJunior ||
      (cargo === Cargo.desenvolvedorPleno ||
        cargo === Cargo.estagiario)) {
      return Papel.usuario;
    }

    if (cargo === Cargo.businessParter) {
      return Papel.bp;
    }

    if (cargo === Cargo.gerente) {
      return Papel.gerente;
    }

    if (cargo === Cargo.mentor) {
      return Papel.metor;
    }
  }


  cadastrar() {

    this.submetido = true;

    if (this.funcionarioForm.invalid) {
      return;
    }

    this.spinner.show();
    this.setInformacoesFuncionario();

    this.funcionarioService.cadastrar(this.funcionario).subscribe(data => {
      this.spinner.hide();
      this.openSnackBar("Seu cadastro foi realizado com sucesso.")
      this.autenticacaoService.login(this.form.username.value, this.form.senha.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['']);
          },
          error => {
            this.spinner.hide();

            this.openSnackBar("ops ocorreu um erro.")
          });
      this.zone.run(() => this.router.navigate(['']));
    }, error => {
      this.spinner.hide();

      this.openSnackBar("ops ocorreu um erro.")
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
