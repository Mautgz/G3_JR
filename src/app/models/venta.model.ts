import { Producto } from "./producto.model";

interface _VentaUser {
    _id: string;
    nombre: string;
}
export class Venta{
    constructor(
        public uid: string,
        public usuario: _VentaUser,
        public producto: Producto,
        public total: number
    ){}
    
}