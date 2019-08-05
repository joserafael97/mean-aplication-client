import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formulario } from '../_models/formulario.class';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {
  
  }

  public cadastrar(formulario: Formulario): Observable<any> {
    return this.http.post(this.API_URL + '/formulario', formulario);
  }
  

  public todosFomularios(): Observable<any> {
    return this.http.get(this.API_URL + '/formulario');
  }

  public remover(idFormulario: string): Observable<any> {
    return this.http.delete(this.API_URL + '/formulario/' + idFormulario );
  }

}
