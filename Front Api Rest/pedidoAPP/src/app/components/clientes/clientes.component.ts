import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { ProductosService } from '../../services/productos.service';
import { PedidosService } from '../../services/pedidos.service';

import Swal from 'sweetalert2';

import { Cliente } from '../../models/cliente.models';
import { Producto } from '../../models/producto.models';
import { PedidoPost } from '../../models/pedidoPost.model';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  showForm: boolean = false;
  textoModal: string = 'Nuevo cliente';
  clienteForm: FormGroup;
  isEditMode: boolean = false;
  selectedCliente: Cliente | null = null;

  // Variables para pedidos
  clienteSeleccionadoParaPedido: Cliente | null = null;
  mostrarModalPedido: boolean = false;

  productos: Producto[] = [];
  productosSeleccionados: number[] = [];
  estadoSeleccionado: number = 1;
  fechaSeleccionada: string = '';


  constructor(
    private clienteService: ClientesService,
    private productoService: ProductosService,
    private pedidosService: PedidosService,
    private formBuilder: FormBuilder
  ) {
    this.clienteForm = formBuilder.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      telefono: ['', [Validators.required, Validators.maxLength(50)]],
      direccion: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.listarClientes();
    this.productoService.getProductos().subscribe((resp: Producto[]) => {
      this.productos = resp;
    });
  }

  listarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (resp: Cliente[]) => {
        this.clientes = resp;
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.textoModal = 'Nuevo cliente';
    this.isEditMode = false;
    this.clienteForm.reset();
    this.selectedCliente = null;
  }

  onSubmit(): void {
    if (this.clienteForm.invalid) {
      return;
    }
    const clienteData: Cliente = this.clienteForm.value;
    if (this.isEditMode) {
      this.clienteService.putClientes(clienteData).subscribe({
        next: (updateCliente: Cliente) => {
          const index = this.clientes.findIndex(c => c.id === clienteData.id);
          if (index !== -1) {
            this.clientes[index] = updateCliente;
          }
          Swal.fire({
            title: 'Cliente ' + updateCliente.nombre + ' actualizado',
            text: 'El cliente ha sido actualizado correctamente',
            icon: 'success',
          });
          this.showForm = false;
          this.clienteForm.reset();
        }
      });
    } else {
      this.clienteService.postClientes(clienteData).subscribe({
        next: (newCliente: Cliente) => {
          this.clientes.push(newCliente);
          Swal.fire({
            title: 'Cliente ' + newCliente.nombre + ' creado',
            text: 'El cliente fue creado correctamente',
            icon: 'success',
          });
          this.showForm = false;
          this.clienteForm.reset();
        }
      });
    }
  }

  editCliente(cliente: Cliente): void {
    this.selectedCliente = cliente;
    this.textoModal = 'Editando cliente: ' + cliente.nombre;
    this.isEditMode = true;
    this.showForm = true;
    this.clienteForm.patchValue({ ...cliente });
  }

  deleteCliente(idCliente: number): void {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el cliente?',
      text: 'Eliminar Cliente',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.isConfirmed) {
        this.clienteService.deleteCliente(idCliente).subscribe({
          next: (deletedCliente: Cliente) => {
            this.clientes = this.clientes.filter(c => c.id !== idCliente);
            Swal.fire({
              title: 'Cliente ' + deletedCliente.nombre + ' eliminado',
              text: 'El cliente fue eliminado',
              icon: 'success'
            });
          }
        });
      }
    });
  }

  // MÉTODOS PARA MODAL DE PEDIDOS
  abrirModalPedido(cliente: Cliente): void {
    this.clienteSeleccionadoParaPedido = cliente;
    this.mostrarModalPedido = true;
  }

  cerrarModalPedido(): void {
    this.mostrarModalPedido = false;
    this.clienteSeleccionadoParaPedido = null;
    this.productosSeleccionados = [];
    this.estadoSeleccionado = 1;
    this.fechaSeleccionada = '';

  }

  registrarPedido(): void {
  if (!this.clienteSeleccionadoParaPedido?.id) {
    Swal.fire('Error', 'No se seleccionó un cliente válido', 'error');
    return;
  }

  const nuevoPedido: PedidoPost = {
    idCliente: this.clienteSeleccionadoParaPedido.id!,
    idProductos: this.productosSeleccionados,
    fecha: new Date(this.fechaSeleccionada),
    estado: this.estadoSeleccionado
  };

  this.pedidosService.postPedido(nuevoPedido).subscribe({
    next: () => {
      Swal.fire('Éxito', 'Pedido registrado correctamente', 'success');
      this.cerrarModalPedido();
    },
    error: () => {
      Swal.fire('Error', 'Hubo un problema al registrar el pedido', 'error');
    }
  });
}

}
