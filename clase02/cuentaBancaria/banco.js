"use strict";
class CuentaBancaria {
    titular;
    saldo;
    constructor(titular, saldo) {
        this.titular = titular;
        this.saldo = saldo;
    }
    realizarTransaccion(tipo, monto = 0) {
        switch (tipo) {
            case "depositar":
                if (monto <= 0) {
                    throw new Error("El monto a depositar debe ser mayor a cero");
                    break;
                }
                this.saldo += monto;
                console.log(`Se ha depositado ${monto}. Saldo actual: ${this.saldo}`);
                break;
            case "retirar":
                if (monto <= 0) {
                    throw new Error("El monto a retirar debe ser mayor a cero");
                    break;
                }
                if (monto > this.saldo) {
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
