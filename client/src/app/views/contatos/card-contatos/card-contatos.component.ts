import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ListarContatosViewModel } from '../models/contato.models';
import { NgForOf, NgIf } from '@angular/common';
import { CardFooterComponent } from "../../partials/card-footer/card-footer.component";

@Component({
  selector: 'app-card-contatos',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatCardModule,
    CardFooterComponent
],
  templateUrl: './card-contatos.component.html',
  styleUrl: '../styles/contatos.scss'
})

export class CardContatosComponent {
  @Input() contatos?: ListarContatosViewModel[] = [];
}
