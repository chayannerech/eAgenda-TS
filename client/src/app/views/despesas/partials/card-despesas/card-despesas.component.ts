import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ListarDespesasViewModel } from '../../models/despesa.models';
import { NgForOf, NgIf } from '@angular/common';
import { CardFooterComponent } from "../../../partials/card-footer/card-footer.component";

@Component({
  selector: 'app-card-despesas',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatCardModule,
    CardFooterComponent
],
  templateUrl: './card-despesas.component.html',
  styleUrl: '../../styles/despesas.scss'
})

export class CardDespesasComponent {
  @Input() despesas?: ListarDespesasViewModel[] = [];

  mostrarData(data: string): string {
    const shortDate = new Date(data)
    return shortDate.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
