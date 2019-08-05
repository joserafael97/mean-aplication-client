
export class Conta {
    contaId: number;
    username: string;
    senha: string;
    papel: string;
    ativo: boolean;
    token?: string;    
    
    constructor() { }

    setDados(dados) {
        this.username = dados.username;
        this.ativo = dados.ativo;
        this.papel = dados.papel;
        this.senha = '';
    }


}
