import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-submeter-exclusao',
  standalone: true,
  imports: [ RouterLink, MatIconModule, MatButtonModule ],
  templateUrl: './submeter-exclusao.component.html'
})

export class SubmeterExclusaoComponent {
  @Input() rota: string = '';
  @Output() confirmacaoExclusao = new EventEmitter<void>();

  excluir() {
    this.confirmacaoExclusao.emit();
  }
}
