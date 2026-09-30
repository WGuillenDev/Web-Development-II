// Lógica de negocio
import type { EmpleadoValido, ResultadoSalario } from "./types.js";

const PAGO_POR_HORA_EXTRA = 15;
const PORCENTAJE_SEGURIDAD_SOCIAL = 0.09;
const COSTO_SEGURO_COMPLEMENTARIO = 45;

function calcularImpuestoRenta(salarioBruto: number): number {
    if (salarioBruto <= 1000) {
        return 0;
    } else if (salarioBruto <= 2500) {
        return salarioBruto * 0.10;
    } else {
        return salarioBruto * 0.15;
    }
}
export function calcularSalario(empleado: EmpleadoValido): ResultadoSalario {
    const salarioBruto = empleado.salario;
    const pagoHorasExtra = (empleado.horasExtra ?? 0) * PAGO_POR_HORA_EXTRA;

    const seguridadSocial = salarioBruto * PORCENTAJE_SEGURIDAD_SOCIAL;
    const impuestoRenta = calcularImpuestoRenta(salarioBruto);
    const seguroComplementario = empleado.seguro ? COSTO_SEGURO_COMPLEMENTARIO : 0;

    const deduccionesTotales = seguridadSocial + impuestoRenta + seguroComplementario;

    const salarioNeto = salarioBruto + pagoHorasExtra - deduccionesTotales;

    return {
        salarioBruto,
        pagoHorasExtra,
        seguridadSocial,
        impuestoRenta,
        seguroComplementario,
        deduccionesTotales,
        salarioNeto,
    };
}
