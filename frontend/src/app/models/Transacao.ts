export interface Transacao {
    id: number;
    descricao: string;
    valor: number;
    categoria: string;
    tipo_transacao_id: number;
    created_at: Date;
    updated_at: Date;
}