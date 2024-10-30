import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-submeter-form',
  standalone: true,
  imports: [ RouterLink, MatIconModule, MatButtonModule ],
  templateUrl: './submeter-form.component.html'
})

export class SubmeterFormComponent {
  @Input() rota: string = '';
}
