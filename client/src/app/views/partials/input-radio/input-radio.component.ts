import { NgForOf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

interface opcoes {
  nome: string;
  valor: number;
}
@Component({
  selector: 'app-input-radio',
  standalone: true,
  imports: [ NgForOf, MatFormFieldModule, MatRadioModule, ReactiveFormsModule ],
  templateUrl: './input-radio.component.html'
})

export class InputRadioComponent {
  @Input() campoDesejado: string = '';
  @Input() opcoes: opcoes[] = [];
  @Output() input = new EventEmitter<number>();

  @Input() valorAtual: number = 0;

  inputControl = new FormControl(this.valorAtual);

  onInputChange(event: any) {
    this.input.emit(event.value);
  }

  ngOnChanges(changes: any) {
    if (changes.valorAtual && changes.valorAtual.currentValue) {
      this.inputControl.setValue(changes.valorAtual.currentValue);
    }
  }
}
