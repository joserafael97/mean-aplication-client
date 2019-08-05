import { Avaliacacao } from './avaliacao.class';
import { Conta } from './conta.class';

export class Funcionario {
    
    nome: string;
    contratacao: Date;
    cargo: string;
    nivel: string;
    ativo: boolean;
    avaliacoes: Avaliacacao[];
    conta: Conta;
    
    constructor(conta: Conta) { 
        this.ativo = true;
        this.avaliacoes = [];
        this.conta = conta
    }
}
