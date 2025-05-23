import { Component } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ViewportScroller } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Producto } from '../../models/producto.models';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  productos: Producto[] = [];
  showForm: boolean = false;
  textoModal: string = 'Nuevo producto';
  productoForm: FormGroup;
  isEditMode: boolean = false;
  selectedProducto: Producto | null = null;

  constructor(private productoService: ProductosService,
    private formBuilder: FormBuilder
  ) {
    this.productoForm = formBuilder.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    })
  }

  ngOnInit() {
    this.listarProductos();
  }

  listarProductos() {
    this.productoService.getProductos().subscribe({
      next: resp => {
        this.productos = resp;
      }
    });
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      return;
    }
    const productoData: Producto = this.productoForm.value;
    if (this.isEditMode) {
      this.productoService.putProductos(productoData).subscribe({
        next: updateProducto => {
          const index = this.productos.findIndex(p => p.id === productoData.id);
          if (index !== -1) {
            this.productos[index] = updateProducto;
          }
          Swal.fire({
            title: 'Producto ' + updateProducto.nombre + ' actualizado',
            text: 'El producto ha sido actualizado correctamente',
            icon: 'success',
          })
          this.showForm = false;
          this.productoForm.reset();
        }
      })
    } else {
      this.productoService.postProductos(productoData).subscribe({
        next: newProducto => {
          this.productos.push(newProducto);
          Swal.fire({
            title: 'Producto ' + newProducto.nombre + ' creado',
            text: 'El producto fue creado correctamente',
            icon: 'success',
          })
          this.showForm = false;
          this.productoForm.reset();
        }
      })
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.textoModal = 'Nuevo producto';
    this.isEditMode = false;
    this.productoForm.reset();
    this.selectedProducto = null;
  }

  editProducto(producto: Producto): void {
    this.selectedProducto = producto;
    this.textoModal = 'Editando producto ' + producto.nombre;
    this.isEditMode = true;
    this.showForm = true;
    this.productoForm.patchValue({
      ...producto
    });
  }

  deleteProducto(idProducto: number): void {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el producto?',
      text: 'Eliminar Producto',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.isConfirmed) {
        this.productoService.deleteProducto(idProducto).subscribe({
          next: deletedProducto => {
            this.productos = this.productos.filter(p => p.id !== idProducto);
          Swal.fire({
            title: 'Cliente ' + deletedProducto.nombre + ' eliminado',
            text: 'El cliente fue eliminado',
            icon: 'success'
            })
          }
        })
      }
    })
  }
}