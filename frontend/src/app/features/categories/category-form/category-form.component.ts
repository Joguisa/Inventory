import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryService } from '../../../core/services/category.service';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../../../core/models/auth/auth.models';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-category-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule
    ],
    templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private categoryService = inject(CategoryService);
    private config = inject(DynamicDialogConfig);
    private ref = inject(DynamicDialogRef);
    private messageService = inject(MessageService);

    form: FormGroup;
    loading = signal(false);
    isEdit = false;

    constructor() {
        this.form = this.fb.group({
            id: [null],
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            description: ['', [Validators.maxLength(200)]]
        });
    }

    ngOnInit() {
        const data = this.config.data;
        if (data && data.mode === 'edit') {
            this.isEdit = true;
            this.form.patchValue(data.category);
        }
    }

    save() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.loading.set(true);
        const category = this.form.value;

        const request: Observable<ApiResponse<any>> = this.isEdit
            ? this.categoryService.update(category.id, category)
            : this.categoryService.create(category);

        request.subscribe({
            next: (response: ApiResponse<any>) => {
                this.loading.set(false);
                if (response.succeeded) {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Categoría ${this.isEdit ? 'actualizada' : 'creada'}` });
                    this.ref.close(true);
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message || 'Error' });
                }
            },
            error: () => {
                this.loading.set(false);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error inesperado' });
            }
        });
    }

    cancel() {
        this.ref.close();
    }
}
