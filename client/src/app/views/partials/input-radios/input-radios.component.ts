import { NgForOf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-input-radios',
  standalone: true,
  imports: [ NgForOf, MatFormFieldModule, MatRadioModule, ReactiveFormsModule ],
  templateUrl: './input-radios.component.html'
})
export class InputRadiosComponent {
  @Input() label: string = '';
  @Input() opcoes: opcoes[] = [];
  @Output() input = new EventEmitter<number>();

  inputControl = new FormControl(0);

  onInputChange(event: any) {
    this.input.emit(event.value);
  }
}

interface opcoes {
  nome: string;
  valor: number;
}
