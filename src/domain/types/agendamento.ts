import { PacienteType } from './paciente';

export type AgendamentoType = {
    data:Date;
    hora: string;
    paciente: PacienteType;
    medico: string;
    formaPagamento:string;
    valor: number;
}