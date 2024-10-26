import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListarTarefasViewModel } from '../models/tarefa.models';

@Component({
  selector: 'app-listar-tarefas',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './listar-tarefas.component.html',
  styleUrl: '../styles/tarefas.scss'
})

export class ListarTarefasComponent {
  tarefass?: ListarTarefasViewModel[] = [];

  constructor( private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.tarefass = this.route.snapshot.data['tarefas'];
  }
}
