import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListarCompromissosViewModel } from '../models/compromisso.models';
import { BotaoCadastrarComponent } from "../../partials/botao-cadastrar/botao-cadastrar.component";
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { CardFooterComponent } from "../../partials/card-footer/card-footer.component";
import { CardCompromissosComponent } from '../partials/card-compromissos/card-compromissos.component';

@Component({
  selector: 'app-listar-compromissos',
  standalone: true,
  imports: [
    TituloComponent,
    BotaoCadastrarComponent,
    CardCompromissosComponent,
    CardFooterComponent
],
  templateUrl: './listar-compromissos.component.html',
  styleUrl: '../styles/compromissos.scss'
})

export class ListarCompromissosComponent {
  compromissos?: ListarCompromissosViewModel[];

  constructor( private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.compromissos = this.route.snapshot.data['compromissos'];
  }
}
