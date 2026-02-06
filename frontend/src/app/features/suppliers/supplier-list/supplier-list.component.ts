import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../../../core/services/supplier.service';
import { Supplier } from '../../../core/models/supplier.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TagModule
  ],
  providers: [DialogService],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.scss'
})
export class SupplierListComponent implements OnInit {
  private supplierService = inject(SupplierService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  suppliers = signal<Supplier[]>([]);
  loading = signal(false);
  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.loading.set(true);
    this.supplierService.getAll().subscribe({
      next: (response) => {
        this.suppliers.set(response.data || []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los proveedores' });
      }
    });
  }

  openNew() {
    this.ref = this.dialogService.open(SupplierFormComponent, {
      header: 'Nuevo Proveedor',
      width: '500px',
      data: { mode: 'create' }
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        this.loadSuppliers();
      }
    });
  }

  editSupplier(supplier: Supplier) {
    this.ref = this.dialogService.open(SupplierFormComponent, {
      header: 'Editar Proveedor',
      width: '500px',
      data: { mode: 'edit', supplier: { ...supplier } }
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        this.loadSuppliers();
      }
    });
  }

  deleteSupplier(supplier: Supplier) {
    this.confirmationService.confirm({
      message: `¿Estás seguro que deseas eliminar el proveedor ${supplier.name}?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.supplierService.delete(supplier.id!).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Proveedor eliminado' });
            this.loadSuppliers();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el proveedor' });
          }
        });
      }
    });
  }
}
