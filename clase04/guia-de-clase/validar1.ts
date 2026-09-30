const inputTexto = document.getElementById("nombre") as HTMLInputElement;
const boton = document.getElementById("boton") as HTMLButtonElement;

boton.addEventListener("click", (): void => {
    const mensaje: string = inputTexto.value;
    
    if (mensaje.trim() === "") {
        alert("Debe escribir su nombre");
    } else {
        alert(`Escribió: ${mensaje}`);
    }
});