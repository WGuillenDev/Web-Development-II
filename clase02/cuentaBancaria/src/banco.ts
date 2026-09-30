class CuentaBancaria {
    constructor(
        public titular: string,
        private saldo: number
    ){}

    public realizarTransaccion(tipo: string, monto: number = 0):void{
        switch(tipo){
            case "depositar":
                if(monto <= 0){
                    throw new Error("El monto a depositar debe ser mayor a cero");
                    break;
                }
                this.saldo += monto;
                console.log(`Se ha depositado ${monto}. Saldo actual: ${this.saldo}`);
                break;
            case "retirar":
                if(monto <= 0){
                    throw new Error("El monto a retirar debe ser mayor a cero");
                    break;
                }
                if(monto > this.saldo){
                    throw new Error("Fondos insuficientes");
                    break;
                }
                this.saldo -= monto;
                console.log(`Se ha retirado ${monto}. Saldo actual: ${this.saldo}`);
                break;
            case "consultar":
                console.log(`Saldo actual: ${this.saldo}`);
                break;
            default:
                throw new Error("Tipo de transacción no válido");
        }
    }
}

const miCuenta = new CuentaBancaria("Juan Pérez", 50000);
const form = document.getElementById("formBanco") as HTMLFormElement;
form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const operacion = document.getElementById("operacion") as HTMLSelectElement;
    const monto = document.getElementById("monto") as HTMLInputElement;
    miCuenta.realizarTransaccion(operacion.value, Number(monto.value));

});

