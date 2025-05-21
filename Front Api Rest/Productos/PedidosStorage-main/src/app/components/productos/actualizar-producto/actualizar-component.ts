import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../producto.service.ts';
import { Producto } from '../producto.model.ts';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html'
})
export class ActualizarProductoComponent implements OnInit {
  productoForm: FormGroup;
  productoId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {
    this.productoForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));

    this.productoService.obtenerProducto(this.productoId).subscribe(producto => {
      this.productoForm.patchValue(producto);
    });
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      const productoActualizado: Producto = {
        id: this.productoId,
        nombre: this.productoForm.get('nombre')?.value,
        descripcion: this.productoForm.get('descripcion')?.value,
        precio: this.productoForm.get('precio')?.value,
        stock: this.productoForm.get('stock')?.value
      };

      this.productoService.actualizarProducto(this.productoId, productoActualizado).subscribe(() => {
        alert('Producto actualizado correctamente');
        this.router.navigate(['/productos']);
      });
    }
  }
}
