import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { toTitleCase } from '../../../app.component';

@Component({
  selector: 'app-input-texto',
  standalone: true,
  imports: [ NgIf, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule ],
  templateUrl: './input-texto.component.html'
})
export class InputTextoComponent implements OnChanges {
  @Input() placeholder: string = '';
  @Input() campoDesejado: string = '';
  @Input() pronome: string = '';
  @Output() inputValido = new EventEmitter<string>();
  @Input() valorAtual: string = '';

  label: string = '';

  inputControl = new FormControl(this.valorAtual, [
    Validators.required,
    Validators.minLength(3)
  ]);

  ngOnChanges(changes: any) {
    if (changes.valorAtual && changes.valorAtual.currentValue) {
      this.inputControl.setValue(changes.valorAtual.currentValue);
    }
    if (this.campoDesejado = "descricao")
      this.label = "Descrição";

    this.label = toTitleCase(this.campoDesejado);
  }

  validarInput() {
    if (this.inputControl.valid) {
      this.inputValido.emit(this.inputControl.value || '');
    }
  }
}
