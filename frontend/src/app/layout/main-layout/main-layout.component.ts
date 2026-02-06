import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, ButtonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  items: MenuItem[] = [
    {
      label: 'Productos',
      icon: 'pi pi-box',
      routerLink: '/products'
    },
    {
      label: 'Proveedores',
      icon: 'pi pi-truck',
      routerLink: '/suppliers'
    },
    {
      label: 'Categorías',
      icon: 'pi pi-tags',
      routerLink: '/categories'
    }
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
