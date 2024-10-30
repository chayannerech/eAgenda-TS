import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { DetalhesContatoViewModel } from '../models/contato.models';

@Component({
  selector: 'app-detalhes-contato',
  standalone: true,
  imports: [
    NgIf,
    MatCardModule
  ],
  templateUrl: './detalhes-contato.component.html',
  styleUrl: '../styles/contatos.scss'
})

export class DetalhesCompromissoComponent {
  @Input() contato: DetalhesContatoViewModel | undefined;
}
