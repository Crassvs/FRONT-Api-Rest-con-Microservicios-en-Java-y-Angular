import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto.model';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html'
})
export class EliminarProductoComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe(() => {
        alert('Producto eliminado');
        this.cargarProductos(); // refrescar lista
      });
    }
  }
}
