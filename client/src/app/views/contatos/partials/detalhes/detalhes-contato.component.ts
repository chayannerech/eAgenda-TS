import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgForOf, NgIf } from '@angular/common';
import { DetalhesContatoViewModel } from '../../models/contato.models';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detalhes-contato',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './detalhes-contato.component.html',
  styleUrl: '../../styles/contatos.scss'
})

export class DetalhesCompromissoComponent{
  @Input() contato: DetalhesContatoViewModel | undefined;

  verificarDatas(dataCompromisso: string, horaCompromisso: string): string {
    const diaAtual = new Date().setHours(0, 0, 0, 0);
    const horaAtual = new Date().getHours().toString();
    const minutoAtual = new Date().getMinutes().toString();

    const diaDoCompromisso = new Date(dataCompromisso).setHours(0, 0, 0, 0);
    const horaDoCompromisso = horaCompromisso.slice(0, 2);
    const minutoDoCompromisso = horaCompromisso.slice(3, 5);

    if (diaAtual > diaDoCompromisso)
      return 'Finalizado';
    else if (diaAtual == diaDoCompromisso)
      if (horaAtual > horaDoCompromisso)
        return 'Finalizado';
      else if (horaAtual == horaDoCompromisso)
        if (minutoAtual > minutoDoCompromisso)
          return 'Finalizado';

    if (diaAtual < diaDoCompromisso)
      return 'Não iniciado';
    else if (diaAtual == diaDoCompromisso)
      if (horaAtual < horaDoCompromisso)
        return 'Não iniciado';
      else if (horaAtual == horaDoCompromisso)
        if (minutoAtual < minutoDoCompromisso)
          return 'Não iniciado';

    return 'Em andamento';
  }

  mostrarData(data: string): string {
    const shortDate = new Date(data)
    return shortDate.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
