import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { SupplierService } from '../../../core/services/supplier.service';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../../../core/models/auth/auth.models';
import { Supplier } from '../../../core/models/supplier.model';
import { Category } from '../../../core/models/category.model';

import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    Textarea,
    InputNumberModule,
    ButtonModule,
    DividerModule,
    DropdownModule,
    CardModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private supplierService = inject(SupplierService);
  private categoryService = inject(CategoryService);
  private config = inject(DynamicDialogConfig);
  private ref = inject(DynamicDialogRef);
  private messageService = inject(MessageService);

  form: FormGroup;
  suppliers = signal<Supplier[]>([]);
  categories = signal<Category[]>([]);
  loading = signal(false);
  isEdit = false;

  constructor() {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]],
      categoryId: [null, [Validators.required]],
      inventoryDetails: this.fb.array([])
    });
  }

  get inventoryDetails() {
    return this.form.get('inventoryDetails') as FormArray;
  }

  async ngOnInit() {
    this.loadSuppliers();
    this.loadCategories();
    const data = this.config.data;
    if (data && data.mode === 'edit') {
      this.isEdit = true;
      this.form.patchValue({
        id: data.product.id,
        name: data.product.name,
        description: data.product.description,
        categoryId: data.product.categoryId
      });

      data.product.inventoryDetails.forEach((detail: any) => {
        this.addInventoryDetail(detail);
      });
    }
  }

  loadSuppliers() {
    this.supplierService.getAll().subscribe({
      next: (resp) => this.suppliers.set(resp.data || []),
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los proveedores' })
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (resp) => this.categories.set(resp.data || []),
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las categorías' })
    });
  }

  addInventoryDetail(detail?: any) {
    const detailForm = this.fb.group({
      supplierId: [detail?.supplierId || null, Validators.required],
      lotNumber: [detail?.lotNumber || '', [Validators.required, Validators.maxLength(10)]],
      price: [detail?.price || null, [Validators.required, Validators.min(0.01), Validators.max(9999.99)]],
      stock: [detail?.stock || null, [Validators.required, Validators.min(1), Validators.max(9999)]]
    });
    this.inventoryDetails.push(detailForm);
  }

  removeInventoryDetail(index: number) {
    if (this.inventoryDetails.length > 1) {
      this.inventoryDetails.removeAt(index);
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Debe haber al menos un detalle de inventario' });
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const product = this.form.value;

    const request: Observable<ApiResponse<any>> = this.isEdit
      ? this.productService.update(product.id, product)
      : this.productService.create(product);

    request.subscribe({
      next: (response: ApiResponse<any>) => {
        this.loading.set(false);
        if (response.succeeded) {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Producto ${this.isEdit ? 'actualizado' : 'creado'}` });
          this.ref.close(true);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message || undefined });
        }
      },
      error: () => {
        this.loading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error inesperado' });
      }
    });
  }

  cancel() {
    this.ref.close();
  }
}
