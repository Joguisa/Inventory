import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/auth/auth.models';
import { Supplier } from '../models/supplier.model';

@Injectable({
    providedIn: 'root'
})
export class SupplierService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/Suppliers`;

    getAll(): Observable<ApiResponse<Supplier[]>> {
        return this.http.get<ApiResponse<Supplier[]>>(this.apiUrl);
    }

    getById(id: number): Observable<ApiResponse<Supplier>> {
        return this.http.get<ApiResponse<Supplier>>(`${this.apiUrl}/${id}`);
    }

    create(supplier: Supplier): Observable<ApiResponse<number>> {
        return this.http.post<ApiResponse<number>>(this.apiUrl, supplier);
    }

    update(id: number, supplier: Supplier): Observable<ApiResponse<boolean>> {
        return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/${id}`, supplier);
    }

    delete(id: number): Observable<ApiResponse<boolean>> {
        return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`);
    }
}
