import { Pergunta } from './pergunta.class';

export class Formulario {
    id: number;
    tipo: string;
    perguntas: Pergunta[];
    descricao: string;
    ativo: boolean;
    constructor() { 
        this.perguntas = [];
        this.descricao = ' ';
    }
}