import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SupplierService } from '../../../core/services/supplier.service';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../../../core/models/auth/auth.models';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    KeyFilterModule
  ],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.scss'
})
export class SupplierFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private supplierService = inject(SupplierService);
  private config = inject(DynamicDialogConfig);
  private ref = inject(DynamicDialogRef);
  private messageService = inject(MessageService);

  form: FormGroup;
  loading = signal(false);
  isEdit = false;

  constructor() {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      contactEmail: ['', [Validators.email, Validators.maxLength(20)]],
      contactPhone: ['', [Validators.pattern('^[0-9]{10}$'), Validators.maxLength(10)]],
      address: ['', [Validators.maxLength(250)]]
    });
  }

  ngOnInit() {
    const data = this.config.data;
    if (data && data.mode === 'edit') {
      this.isEdit = true;
      this.form.patchValue(data.supplier);
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const supplier = this.form.value;

    const request: Observable<ApiResponse<any>> = this.isEdit
      ? this.supplierService.update(supplier.id, supplier)
      : this.supplierService.create(supplier);

    request.subscribe({
      next: (response: ApiResponse<any>) => {
        this.loading.set(false);
        if (response.succeeded) {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Proveedor ${this.isEdit ? 'actualizado' : 'creado'}` });
          this.ref.close(true);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message || 'Error en la operación' });
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
