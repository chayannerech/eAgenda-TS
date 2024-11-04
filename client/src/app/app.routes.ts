import { CanMatchFn, Router, Routes, UrlTree } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RegistroComponent } from './core/auth/views/registro/registro.component';
import { LoginComponent } from './core/auth/views/login/login.component';
import { categoriasRoutes } from './views/categorias/categorias.routes';
import { UsuarioService } from './core/auth/service/usuario.service';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { contatosRoutes } from './views/contatos/contatos.routes';
import { compromissosRoutes } from './views/compromissos/compromissos.routes';
import { tarefasRoutes } from './views/tarefas/tarefas.routes';
import { despesasRoutes } from './views/despesas/despesas.routes';

const authGuard: CanMatchFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const usuarioService = inject(UsuarioService)

  return usuarioService.usuarioAutenticado
    .pipe(map(usuario => {
      if (!usuario)
        return router.parseUrl('/login');

      return true;
    }));
}

const authUserGuard: CanMatchFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const usuarioService = inject(UsuarioService)

  return usuarioService.usuarioAutenticado
    .pipe(map(usuario => {
      if (usuario)
        return router.parseUrl('/dashboard');

      return true;
    }));
}

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'registro',
    loadComponent: () => import('./core/auth/views/registro/registro.component').then(c => c.RegistroComponent),
    canMatch:[authUserGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./core/auth/views/login/login.component').then(c => c.LoginComponent),
    canMatch:[authUserGuard]
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./views/dashboard/dashboard.component').then(c => c.DashboardComponent),
    canMatch:[authGuard]
  },
  {
    path: 'categorias',
    loadChildren: () => import('./views/categorias/categorias.routes').then(m => m.categoriasRoutes),
    canMatch:[authGuard]
  },
  {
    path: 'contatos',
    loadChildren: () => import('./views/contatos/contatos.routes').then(m => m.contatosRoutes),
    canMatch:[authGuard]
  },
  {
    path: 'compromissos',
    loadChildren: () => import('./views/compromissos/compromissos.routes').then(m => m.compromissosRoutes),
    canMatch:[authGuard]
  },
  {
    path: 'tarefas',
    loadChildren: () => import('./views/tarefas/tarefas.routes').then(m => m.tarefasRoutes),
    canMatch:[authGuard]
  },
  {
    path: 'despesas',
    loadChildren: () => import('./views/despesas/despesas.routes').then(m => m.despesasRoutes),
    canMatch:[authGuard]
  }
];
