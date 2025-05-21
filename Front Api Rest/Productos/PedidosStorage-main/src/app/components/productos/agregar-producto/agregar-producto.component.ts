import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto.model';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html'
})
export class AgregarProductoComponent {
  productoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      const nuevoProducto: Producto = this.productoForm.value;

      this.productoService.agregarProducto(nuevoProducto).subscribe(() => {
        alert('Producto agregado correctamente');
        this.router.navigate(['/productos']);
      });
    }
  }
}
