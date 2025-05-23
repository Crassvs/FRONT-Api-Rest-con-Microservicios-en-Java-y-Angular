export interface PedidoGet {
  id: number;
  idCliente: number;
  productos: string[];
  total: number;
  fecha: string;
  estado: number;
  cliente?: string;  // <- Esta propiedad es calculada en el frontend
}
