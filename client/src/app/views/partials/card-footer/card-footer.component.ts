import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-card-footer',
  standalone: true,
  imports: [ RouterLink, MatIconModule, MatButtonModule, MatTooltip, MatCardModule ],
  templateUrl: './card-footer.component.html',
  styleUrl: './card-footer.component.scss',
})

export class CardFooterComponent {
  @Input() rota: string = '';
  @Input() id: string = '';
}
