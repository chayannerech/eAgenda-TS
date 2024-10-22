import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ContatoService } from '../services/contato.service';
import { ListarContatos } from '../models/contato.models';

@Component({
  selector: 'app-listar-contato',
  standalone: true,
  imports: [ RouterLink, NgForOf, NgIf, AsyncPipe, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule ],
  templateUrl: './listar-contato.component.html',
  styleUrl: './listar-contato.component.scss'
})

export class ListarContatosComponent {
  contatos$?: Observable<ListarContatos[]>;

  constructor( private contatoService: ContatoService ) {}

  ngOnInit(): void {
    this.contatos$ = this.contatoService.selecionarTodos();
  }
}
