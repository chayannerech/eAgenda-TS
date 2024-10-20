import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShellComponent } from "./core/shell/shell.component";
import { Observable } from 'rxjs';
import { UsuarioTokenViewModel } from './core/auth/models/auth.models';
import { AsyncPipe } from '@angular/common';
import { UsuarioService } from './core/auth/service/usuario.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, ShellComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  usuarioAuthenticado$?: Observable<UsuarioTokenViewModel | undefined>

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioAuthenticado$ = this.usuarioService.usuarioAutenticado;
  }
}
