// 1. Interfaces del modelo de datos y de errores
interface FormularioRegistro {
  nombre: string;
  email: string;
  telefono: string;
  edad: number | undefined;
}

type FormErrors<T> = {
  [K in keyof T]?: string;
};

// 2. Selección tipada de elementos del DOM
const formulario = document.getElementById("registroForm") as HTMLFormElement;
const inputNombre = document.getElementById("nombre") as HTMLInputElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputTelefono = document.getElementById("telefono") as HTMLInputElement;
const inputEdad = document.getElementById("edad") as HTMLInputElement;

// Elementos donde se dibujan los mensajes de error
const errorNombre = document.getElementById("errorNombre") as HTMLDivElement;
const errorEmail = document.getElementById("errorEmail") as HTMLDivElement;
const errorTelefono = document.getElementById("errorTelefono") as HTMLDivElement;
const errorEdad = document.getElementById("errorEdad") as HTMLDivElement;

// 3. Funciones de validación lógica
// --- FUNCIÓN PURA DE VALIDACIÓN ---
function validarFormulario(datos: Partial<FormularioRegistro>): FormErrors<FormularioRegistro> {
  const errores: FormErrors<FormularioRegistro> = {};

  // Validar Nombre
  if (!datos.nombre || datos.nombre.trim().length < 3) {
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";
  }

  // Validar Correo Electrónico
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!datos.email || !regexEmail.test(datos.email)) {
    errores.email = "Introduce un correo electrónico válido.";
  }

  // Validar Teléfono (Permite entre 8 y 10 dígitos numéricos)
  const regexTelefono = /^\d{8,10}$/;
  if (!datos.telefono || !regexTelefono.test(datos.telefono.trim())) {
    errores.telefono = "El teléfono debe contener entre 8 y 10 números.";
  }

  // Validar Edad
  if (datos.edad === undefined || isNaN(datos.edad)) {
    errores.edad = "La edad es requerida.";
  } else if (datos.edad < 18) {
    errores.edad = "Debes ser mayor de 18 años para registrarte.";
  }

  return errores;
}

// Limpia las alertas visibles en el HTML
function limpiarErroresDOM(): void {
  errorNombre.textContent = "";
  errorEmail.textContent = "";
  errorTelefono.textContent = "";
  errorEdad.textContent = "";
}

// Evento Submit
formulario.addEventListener("submit", (e: SubmitEvent): void => {
  e.preventDefault();
  limpiarErroresDOM();

  // Recolectar datos ingresados
  const datosEntrada: Partial<FormularioRegistro> = {
    nombre: inputNombre.value,
    email: inputEmail.value,
    telefono: inputTelefono.value,
    edad: inputEdad.value !== "" ? Number(inputEdad.value) : undefined,
  };

  // Ejecutar validación
  const errores = validarFormulario(datosEntrada);

  // Verificar si existen errores
  const tieneErrores = Object.keys(errores).length > 0;

  if (tieneErrores) {
    // Renderizar mensajes de error específicos en la interfaz
    if (errores.nombre) errorNombre.textContent = errores.nombre;
    if (errores.email) errorEmail.textContent = errores.email;
    if (errores.telefono) errorTelefono.textContent = errores.telefono;
    if (errores.edad) errorEdad.textContent = errores.edad;
  } else {
    alert("¡Formulario enviado con éxito!");
    formulario.reset();
  }
});
