export type Contrato = "tiempo_completo" | "medio_tiempo" | "freelance";

export interface DatosEmpleado {
    nombre: string;
    salario: number | undefined;
    horasExtra: number | undefined;
    contrato: Contrato | "";
    seguro: boolean;
}

export interface EmpleadoValido {
    nombre: string;
    salario: number;
    horasExtra: number | undefined;
    contrato: Contrato;
    seguro: boolean;
}

export type FormErrors<T> = {
    [K in keyof T]?: string;
};

export interface ResultadoSalario {
    salarioBruto: number;
    pagoHorasExtra: number;
    seguridadSocial: number;
    impuestoRenta: number;
    seguroComplementario: number;
    deduccionesTotales: number;
    salarioNeto: number;
}
