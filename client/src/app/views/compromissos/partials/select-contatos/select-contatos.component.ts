import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { Observable } from 'rxjs';
import { ListarContatosViewModel } from '../../../contatos/models/contato.models';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-contatos',
  standalone: true,
  imports: [ NgIf, NgForOf, MatFormFieldModule, MatRadioModule, ReactiveFormsModule, MatSelectModule ],
  templateUrl: './select-contatos.component.html'
})

export class SelectContatosComponent {
  @Input() contatos?: ListarContatosViewModel[];
  @Input() valorAtual: string = '';
  @Output() input = new EventEmitter<string>();

  inputControl = new FormControl(this.valorAtual, [ Validators.required ]);

  ngOnChanges(changes: any) {
    if (changes.valorAtual && changes.valorAtual.isFirstChange()) {
      this.inputControl.setValue(changes.valorAtual.currentValue);
    }
  }

  onInputChange(event: any) {
    this.input.emit(event.value);
  }
}
