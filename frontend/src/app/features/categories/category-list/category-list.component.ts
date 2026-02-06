import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        ToastModule
    ],
    providers: [DialogService, ConfirmationService],
    templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
    private categoryService = inject(CategoryService);
    private dialogService = inject(DialogService);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);

    categories = signal<Category[]>([]);
    loading = signal(false);
    ref: DynamicDialogRef | undefined;

    ngOnInit() {
        this.loadCategories();
    }

    loadCategories() {
        this.loading.set(true);
        this.categoryService.getAll().subscribe({
            next: (resp) => {
                this.categories.set(resp.data || []);
                this.loading.set(false);
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las categorías' });
                this.loading.set(false);
            }
        });
    }

    openNew() {
        this.ref = this.dialogService.open(CategoryFormComponent, {
            header: 'Nueva Categoría',
            width: '400px',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            data: { mode: 'create' }
        });

        this.ref.onClose.subscribe((result) => {
            if (result) {
                this.loadCategories();
            }
        });
    }

    editCategory(category: Category) {
        this.ref = this.dialogService.open(CategoryFormComponent, {
            header: 'Editar Categoría',
            width: '400px',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            data: { mode: 'edit', category: { ...category } }
        });

        this.ref.onClose.subscribe((result) => {
            if (result) {
                this.loadCategories();
            }
        });
    }

    deleteCategory(category: Category) {
        this.confirmationService.confirm({
            message: `¿Estás seguro que deseas eliminar la categoría ${category.name}?`,
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoryService.delete(category.id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categoría eliminada' });
                        this.loadCategories();
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la categoría' });
                    }
                });
            }
        });
    }
}
