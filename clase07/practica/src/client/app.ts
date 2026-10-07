const formulario = document.getElementById("formPerfil") as HTMLFormElement | null;
const inputNombre = document.getElementById("nombre") as HTMLInputElement | null;
const inputCorreo = document.getElementById("correo") as HTMLInputElement | null;
const resultadoDiv = document.getElementById("resultado") as HTMLDivElement | null;

if (formulario && inputNombre && inputCorreo && resultadoDiv) {
  formulario.addEventListener("submit", async (evento: SubmitEvent) => {
    // Evita el envío tradicional que recarga la página
    evento.preventDefault();

    try {
      const respuesta = await fetch("/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: inputNombre.value, correo: inputCorreo.value }),
      });
      const datos = await respuesta.json();
      resultadoDiv.innerText = datos.mensaje;
    } catch {
      resultadoDiv.innerText = "Error al conectar con el servidor";
    }
  });
}
