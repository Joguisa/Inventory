import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TagModule
  ],
  providers: [DialogService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  products = signal<Product[]>([]);
  loading = signal(false);
  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    this.productService.getAll().subscribe({
      next: (response) => {
        this.products.set(response.data || []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los productos' });
      }
    });
  }

  openNew() {
    this.ref = this.dialogService.open(ProductFormComponent, {
      header: 'Nuevo Producto',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: { mode: 'create' }
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  editProduct(product: Product) {
    this.ref = this.dialogService.open(ProductFormComponent, {
      header: 'Editar Producto',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: { mode: 'edit', product: { ...product } }
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: `¿Estás seguro que deseas eliminar ${product.name}?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.delete(product.id!).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto eliminado' });
            this.loadProducts();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el producto' });
          }
        });
      }
    });
  }

  getMinPrice(product: Product) {
    const prices = product.inventoryDetails.map(d => d.price);
    return prices.length > 0 ? Math.min(...prices) : 0;
  }

  getTotalStock(product: Product) {
    return product.inventoryDetails.reduce((acc, curr) => acc + curr.stock, 0);
  }
}
