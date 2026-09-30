// Lógica de negocio
import type { DatosEmpleado, EmpleadoValido, FormErrors } from "./types.js";

export function validarFormulario(datos: DatosEmpleado): FormErrors<DatosEmpleado> {
    const errores: FormErrors<DatosEmpleado> = {};

    if (datos.nombre.trim().length < 3) {
        errores.nombre = "El nombre debe tener al menos 3 caracteres.";
    }

    if (datos.salario === undefined || Number.isNaN(datos.salario)) {
        errores.salario = "El salario bruto es requerido.";
    } else if (datos.salario <= 0) {
        errores.salario = "El salario bruto debe ser mayor que 0.";
    }

    if (datos.horasExtra !== undefined) {
        if (Number.isNaN(datos.horasExtra) || datos.horasExtra < 0) {
            errores.horasExtra = "Las horas extra no pueden ser negativas.";
        }
    }

    if (datos.contrato === "") {
        errores.contrato = "Selecciona un tipo de contrato.";
    }

    return errores;
}

export function esEmpleadoValido(datos: DatosEmpleado): datos is DatosEmpleado & EmpleadoValido {
    return datos.salario !== undefined && datos.contrato !== "";
}
