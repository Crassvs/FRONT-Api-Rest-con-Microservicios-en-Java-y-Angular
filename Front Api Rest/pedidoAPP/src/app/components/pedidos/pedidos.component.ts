import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PedidosService } from '../../services/pedidos.service';
import { ProductosService } from '../../services/productos.service';
import { ClientesService } from '../../services/clientes.service';
import { PedidoGet } from '../../models/pedidoGet.models';

@Component({
  selector: 'app-pedidos',
  standalone: false,
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  clientes: any[] = [];
  productosDisponibles: any[] = [];

  pedidoForm!: FormGroup;
  pedidos: PedidoGet[] = [];
  selectedPedido!: PedidoGet | null;
  textoModal = '';
  isEditMode = false;
  showForm = false;

  estados = [
    { id: 1, nombre: 'Pendiente' },
    { id: 2, nombre: 'Enviado' },
    { id: 3, nombre: 'Entregado' },
    { id: 4, nombre: 'Cancelado' }
  ];

  productosSeleccionados: any[] = [];

  constructor(
    private pedidoService: PedidosService,
    private clienteService: ClientesService,
    private productoService: ProductosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(clientesResp => {
      this.clientes = clientesResp;
      this.productoService.getProductos().subscribe(resp => this.productosDisponibles = resp);
      this.obtenerPedidos();
    });

    this.pedidoForm = this.formBuilder.group({
      id: [null],
      idCliente: [null, Validators.required],
      idProductos: [[], Validators.required],
      fecha: ['', Validators.required],
      estado: [0, Validators.required]
    });
  }

  private actualizarProductosFormControl(): void {
    const ids = this.productosSeleccionados.map(p => p.id);
    this.pedidoForm.get('idProductos')?.setValue(ids);
    this.pedidoForm.get('idProductos')?.markAsTouched();
    this.pedidoForm.get('idProductos')?.updateValueAndValidity();
  }

  agregarProducto(event: any) {
    const id = +event.target.value;
    if (!id) return;
    const producto = this.productosDisponibles.find(p => p.id === id);
    if (producto && !this.productosSeleccionados.find(p => p.id === id)) {
      this.productosSeleccionados.push(producto);
    }
    this.actualizarProductosFormControl();
    event.target.value = '';
  }

  quitarProducto(index: number) {
    this.productosSeleccionados.splice(index, 1);
    this.actualizarProductosFormControl();
  }

  obtenerPedidos(): void {
    this.pedidoService.getPedidos().subscribe({
      next: resp => {
        this.pedidos = resp
          .filter(p => Number(p.estado) !== 4) // Filtrar cancelados
          .map(pedido => {
            const idCliente = pedido.idCliente as string | number;
            const cliente = this.clientes.find(c => {
              if (typeof idCliente === 'number') {
                return c.id === idCliente;
              }
              return c.nombre.trim().toLowerCase() === idCliente.trim().toLowerCase();
            });

            return {
              ...pedido,
              estado: Number(pedido.estado),
              cliente: cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Cliente no encontrado'
            };
          });
      },
      error: err => {
        console.error('Error al obtener pedidos:', err);
        Swal.fire('Error', 'No se pudieron cargar los pedidos', 'error');
      }
    });
  }

  listarPedidos(): void {
    this.obtenerPedidos();
  }

  onSubmit(): void {
    if (this.pedidoForm.invalid) return;

    const pedidoPost: any = {
      idCliente: this.pedidoForm.value.idCliente,
      idProductos: this.pedidoForm.value.idProductos,
      fecha: this.pedidoForm.value.fecha,
      estado: this.pedidoForm.value.estado
    };

    if (this.isEditMode && this.pedidoForm.value.id) {
      pedidoPost.id = this.pedidoForm.value.id;

      this.pedidoService.putPedido(pedidoPost).subscribe({
        next: () => {
          this.obtenerPedidos();
          Swal.fire('Pedido actualizado', 'El pedido ha sido actualizado correctamente', 'success');
          this.resetForm();
        },
        error: err => {
          console.error('Error actualizando pedido:', err);
          Swal.fire('Error', 'No se pudo actualizar el pedido', 'error');
        }
      });
    } else {
      this.pedidoService.postPedido(pedidoPost).subscribe({
        next: () => {
          this.obtenerPedidos();
          Swal.fire('Pedido creado', 'El pedido fue creado correctamente', 'success');
          this.resetForm();
        },
        error: err => {
          console.error('Error creando pedido:', err);
          Swal.fire('Error', 'No se pudo crear el pedido', 'error');
        }
      });
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.textoModal = 'Nuevo pedido';
    this.isEditMode = false;
    this.pedidoForm.reset();
    this.selectedPedido = null;
    this.productosSeleccionados = [];
  }

  editPedido(pedido: PedidoGet): void {
    if (pedido.estado === 3) {
      Swal.fire('No permitido', 'No se puede editar un pedido que ya fue entregado', 'warning');
      return;
    }

    const clienteEncontrado = this.clientes.find(c => `${c.nombre} ${c.apellido}` === pedido.cliente);
    const idCliente = clienteEncontrado ? clienteEncontrado.id : null;

    const idProductos = this.productosDisponibles
      .filter(p => pedido.productos.includes(p.nombre))
      .map(p => p.id);

    this.productosSeleccionados = this.productosDisponibles.filter(p => idProductos.includes(p.id));

    this.pedidoForm.patchValue({
      id: pedido.id,
      idCliente,
      idProductos,
      fecha: pedido.fecha,
      estado: pedido.estado
    });

    this.selectedPedido = pedido;
    this.textoModal = 'Editando pedido';
    this.isEditMode = true;
    this.showForm = true;
  }

  getEstadoNombre(estadoId: number): string {
    const estado = this.estados.find(e => e.id === estadoId);
    return estado ? estado.nombre : 'Desconocido';
  }

  getEstadoClase(estadoId: number): string {
    switch (estadoId) {
      case 1: return 'badge bg-warning text-dark';   // Pendiente
      case 2: return 'badge bg-success';             // Enviado
      case 3: return 'badge bg-primary';             // Entregado
      case 4: return 'badge bg-danger';              // Cancelado
      default: return 'badge bg-secondary';
    }
  }

  deletePedido(idPedido: number): void {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el pedido?',
      text: 'Eliminar Pedido',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.isConfirmed) {
        this.pedidoService.deletePedido(idPedido).subscribe({
          next: () => {
            this.pedidos = this.pedidos.filter(p => p.id !== idPedido);
            Swal.fire('Pedido eliminado', 'El pedido fue eliminado correctamente', 'success');
          }
        });
      }
    });
  }

  private resetForm(): void {
    this.showForm = false;
    this.pedidoForm.reset();
    this.selectedPedido = null;
    this.isEditMode = false;
    this.productosSeleccionados = [];
  }

  convertirEstadoNombreANumero(nombre: string): number {
    switch (nombre) {
      case 'Pendiente': return 1;
      case 'Enviado': return 2;
      case 'Entregado': return 3;
      default: return 0;
    }
  }
}
