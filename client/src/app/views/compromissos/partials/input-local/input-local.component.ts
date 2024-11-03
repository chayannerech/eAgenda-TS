import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-local',
  standalone: true,
  imports: [ NgIf, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule ],
  templateUrl: './input-local.component.html'
})
export class InputLocalComponent implements OnChanges {
  @Input() controle!: AbstractControl<any, any> | null;
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
