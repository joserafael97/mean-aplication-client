import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AvaliacaoService {

    private API_URL = environment.API_URL;

    constructor(private http: HttpClient) {

    }

    public buscarAvaliacoesPeloIdFuncionario(idFuncionario: string): Observable<any> {
        return this.http.get(this.API_URL + '/avaliacao/' + idFuncionario);
    }


    public todasAvaliacoes(): Observable<any> {
        return this.http.get(this.API_URL + '/avaliacao');
    }
}