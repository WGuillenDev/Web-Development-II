const btn = document.getElementById("btnFetch") as HTMLButtonElement | null;
const resultadoDiv = document.getElementById("resultado") as HTMLDivElement | null;

if (btn && resultadoDiv) {
  btn.addEventListener("click", async () => {
    try {
      // Petición a la API del servidor Express
      const respuesta = await fetch("/api/hola");
      const datos = await respuesta.json();

      resultadoDiv.innerText = `Servidor dice: "${datos.mensaje}"`;
      resultadoDiv.style.color = "green";
    } catch (error) {
      resultadoDiv.innerText = "Error al conectar con el servidor";
      resultadoDiv.style.color = "red";
    }
  });
}
