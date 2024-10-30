import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-botao-cadastrar',
  standalone: true,
  imports: [ RouterLink, MatIconModule, MatButtonModule ],
  templateUrl: './botao-cadastrar.component.html',
  styleUrl: './botao-cadastrar.component.scss',
})

export class BotaoCadastrarComponent {
  @Input() rota: string = '';
}
