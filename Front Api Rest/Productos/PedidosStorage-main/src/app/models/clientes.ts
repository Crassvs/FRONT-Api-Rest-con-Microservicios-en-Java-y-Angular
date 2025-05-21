import { IClientes } from '../interfaces/ICLientes';

export class Clientes implements IClientes{

    constructor(
        public clienteID,
        public nombre,
        public apellido,
        public direccion
        ) { }

    public static createInstance(data: any): Clientes {
        const {
            clienteID,
            nombre,
            apellido,
            direccion
        } = data;

        return new Clientes(
            clienteID,
            nombre,
            apellido,
            direccion
            );
    }
}