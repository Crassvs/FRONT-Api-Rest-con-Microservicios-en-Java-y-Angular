import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/models/productos';
import { ProductosService } from '../../services/producto.service';
import { PedidosService } from '../../services/pedidos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos: Array<Productos> = new Array<Productos>();

  constructor(public productosService: ProductosService,
              public pedidosService: PedidosService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productos = this.productosService.productosLocalStorage;
  }

  buscarProductos(nombreBuscar) {
    this.productos = this.productosService.productosLocalStorage.filter( producto => {
      return producto.nombre.toLocaleLowerCase().includes(nombreBuscar.toLocaleLowerCase());
    });
  }

  agregar(producto: Productos) {
    this.pedidosService.pedido.agregarProducto(producto);
    this.pedidosService.guardarLocalStorage();
    console.log(this.pedidosService.pedido);
  }


  eliminar(producto: Productos) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${producto.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if (resp.value ) {
        Swal.fire({
          text: 'Se elimino correctamente',
          icon: 'success'
        });
        this.productosService.eliminarProducto(producto);
        this.obtenerProductos();
      }
    });
  }
}
