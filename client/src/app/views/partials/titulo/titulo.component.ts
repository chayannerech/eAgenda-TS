import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-titulo',
  standalone: true,
  imports: [ RouterLink, MatIconModule, MatButtonModule ],
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.scss',
})

export class TituloComponent {
  @Input() componenteCss: string = '';
  @Input() titulo: string = '';
  @Input() icone: string = '';
}
