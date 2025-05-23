export interface PedidoPost {
  id?: number | null;
  idCliente: number;
  idProductos: number[];
  fecha: Date;
  estado: number;
}
