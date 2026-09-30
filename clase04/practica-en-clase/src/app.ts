// Punto de entrada: conecta el DOM, formulario y resultado con la lógica
import type { Contrato, DatosEmpleado, FormErrors, ResultadoSalario } from "./types.js";
import { validarFormulario, esEmpleadoValido } from "./validacion.js";
import { calcularSalario } from "./calculo.js";


const formulario = document.getElementById("salarioForm") as HTMLFormElement;
const inputNombre = document.getElementById("nombre") as HTMLInputElement;
const inputSalario = document.getElementById("salario") as HTMLInputElement;
const inputHorasExtra = document.getElementById("horasExtra") as HTMLInputElement;
const selectContrato = document.getElementById("contrato") as HTMLSelectElement;
const checkSeguro = document.getElementById("seguro") as HTMLInputElement;
const divResultado = document.getElementById("resultado") as HTMLDivElement;


function leerNumero(input: HTMLInputElement): number | undefined {
    return input.value !== "" ? Number(input.value) : undefined;
}

function limpiarErroresDOM(): void {
    document.querySelectorAll<HTMLSpanElement>(".error-msg").forEach((span) => {
        span.textContent = "";
    });
    divResultado.textContent = "";
}

function mostrarErrores(errores: FormErrors<DatosEmpleado>): void {
    for (const [campo, mensaje] of Object.entries(errores)) {
        const span = document.getElementById(`error-${campo}`);
        if (span && mensaje) {
            span.textContent = mensaje;
        }
    }
}

function formatearDinero(valor: number): string {
    return `$${valor.toFixed(2)}`;
}

function mostrarResultado(nombre: string, r: ResultadoSalario): void {
    const filas: [string, string][] = [
        ["Salario bruto", formatearDinero(r.salarioBruto)],
        ["(+) Pago horas extra", formatearDinero(r.pagoHorasExtra)],
        ["(-) Seguridad social (9%)", formatearDinero(r.seguridadSocial)],
        ["(-) Impuesto sobre la renta", formatearDinero(r.impuestoRenta)],
        ["(-) Seguro complementario", formatearDinero(r.seguroComplementario)],
        ["Deducciones totales", formatearDinero(r.deduccionesTotales)],
        ["Salario neto", formatearDinero(r.salarioNeto)],
    ];

    const titulo = document.createElement("h2");
    titulo.textContent = `Desglose de ${nombre}`;

    const tabla = document.createElement("table");
    for (const [concepto, monto] of filas) {
        const tr = tabla.insertRow();
        tr.insertCell().textContent = concepto;
        tr.insertCell().textContent = monto;
    }

    divResultado.append(titulo, tabla);
}


formulario.addEventListener("submit", (e: SubmitEvent): void => {
    e.preventDefault();
    limpiarErroresDOM();

    const datosEntrada: DatosEmpleado = {
        nombre: inputNombre.value,
        salario: leerNumero(inputSalario),
        horasExtra: leerNumero(inputHorasExtra),
        contrato: selectContrato.value as Contrato | "",
        seguro: checkSeguro.checked,
    };

    const errores = validarFormulario(datosEntrada);
    const tieneErrores = Object.keys(errores).length > 0;

    if (tieneErrores || !esEmpleadoValido(datosEntrada)) {
        mostrarErrores(errores);
        return;
    }
    const resultado = calcularSalario(datosEntrada);
    mostrarResultado(datosEntrada.nombre.trim(), resultado);
});
