import { PacienteType } from './paciente';

export type AgendamentoType = {
    data:Date;
    hora: string;
    paciente: PacienteType | null;
    medico: string;
    procedimento:string;
    formaPagamento:string;
    valor: number;
}