import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Funcionario } from '../_models/funcionario.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {

  }

  public cadastrar(funcionario: Funcionario): Observable<any> {
    return this.http.post(this.API_URL + '/funcionario', funcionario);
  }


  public buscarFuncionarioPelaIdConta(idConta: string): Observable<any> {
    return this.http.get(this.API_URL + '/funcionario/' + idConta);
  }

  public buscarTodosFuncionario(): Observable<any> {
    return this.http.get(this.API_URL + '/funcionario');
  }


}



