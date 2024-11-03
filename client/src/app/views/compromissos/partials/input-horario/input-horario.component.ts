import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-horario',
  standalone: true,
  imports: [ NgIf, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule ],
  templateUrl: './input-horario.component.html'
})
export class InputHorarioComponent implements OnChanges {
  @Input() campoDesejado: string = '';
  @Input() placeholder: string = '';
  @Input() valorAtual: string = '';
  @Output() inputHorario = new EventEmitter<string>();

  inputControl = new FormControl(this.valorAtual, [
    Validators.required,
    Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
  ]);

  ngOnChanges(changes: any) {
    if (changes.valorAtual && changes.valorAtual.currentValue) {
      this.inputControl.setValue(changes.valorAtual.currentValue);
    }
  }

  validarInput() {
    if (this.inputControl.valid) {
      this.inputHorario.emit(this.inputControl.value || '');
    }
  }
}
