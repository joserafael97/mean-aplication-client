import { Funcionario } from './funcionario.class';

export class Avaliacacao{
    id: number
    descricao:string;
    data: Date;
    respostas: any[];
    funcionario: Funcionario;
    status: string;

    constructor() {}
}