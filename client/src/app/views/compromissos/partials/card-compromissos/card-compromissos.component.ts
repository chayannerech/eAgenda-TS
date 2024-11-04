import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgForOf, NgIf } from '@angular/common';
import { CardFooterComponent } from '../../../partials/card-footer/card-footer.component';
import { ListarCompromissosViewModel } from '../../models/compromisso.models';

@Component({
  selector: 'app-card-compromissos',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatCardModule,
    CardFooterComponent
],
  templateUrl: './card-compromissos.component.html',
  styleUrl: '../../styles/compromissos.scss'
})

export class CardCompromissosComponent {
  @Input() compromissos?: ListarCompromissosViewModel[] = [];

  mostrarData(data: string): string {
    const shortDate = new Date(data)
    return shortDate.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
