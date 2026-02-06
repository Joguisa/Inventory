import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { SupplierListComponent } from './features/suppliers/supplier-list/supplier-list.component';
import { CategoryListComponent } from './features/categories/category-list/category-list.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'products', component: ProductListComponent },
            { path: 'suppliers', component: SupplierListComponent },
            { path: 'categories', component: CategoryListComponent },
            { path: '', redirectTo: 'products', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'products' }
];
