import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/auth/auth.models';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/Categories`;

    getAll(): Observable<ApiResponse<Category[]>> {
        return this.http.get<ApiResponse<Category[]>>(this.apiUrl);
    }

    getById(id: number): Observable<ApiResponse<Category>> {
        return this.http.get<ApiResponse<Category>>(`${this.apiUrl}/${id}`);
    }

    create(category: Category): Observable<ApiResponse<number>> {
        return this.http.post<ApiResponse<number>>(this.apiUrl, category);
    }

    update(id: number, category: Category): Observable<ApiResponse<boolean>> {
        return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/${id}`, category);
    }

    delete(id: number): Observable<ApiResponse<boolean>> {
        return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`);
    }
}
