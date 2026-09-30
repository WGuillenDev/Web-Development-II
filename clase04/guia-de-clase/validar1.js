const inputTexto = document.getElementById("nombre");
const boton = document.getElementById("boton");
boton.addEventListener("click", () => {
    const mensaje = inputTexto.value;
    if (mensaje.trim() === "") {
        alert("Debe escribir su nombre");
    }
    else {
        alert(`Escribió: ${mensaje}`);
    }
});
export {};
//# sourceMappingURL=validar1.js.map