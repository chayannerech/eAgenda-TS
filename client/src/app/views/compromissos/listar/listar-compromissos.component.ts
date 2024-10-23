import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CompromissoService } from '../services/compromisso.service';
import { ListarCompromissos } from '../models/compromisso.models';

@Component({
  selector: 'app-listar-compromissos',
  standalone: true,
  imports: [ RouterLink, NgForOf, NgIf, AsyncPipe, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule ],
  templateUrl: './listar-compromissos.component.html',
  styleUrl: '../styles/compromissos.scss'
})

export class ListarCompromissosComponent {
  compromissos$?: Observable<ListarCompromissos[]>;

  constructor( private compromissoService: CompromissoService ) {}

  ngOnInit(): void {
    this.compromissos$ = this.compromissoService.selecionarTodos();
  }
}
