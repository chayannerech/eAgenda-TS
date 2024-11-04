import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-data',
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
 ],
  templateUrl: './input-data.component.html'
})
export class InputDataComponent {
  @Input() valorAtual: string = '';
  @Output() input = new EventEmitter<string>();

  inputControl = new FormControl('', [ Validators.required ]);

  ngOnChanges(changes: any) {
    if (changes.valorAtual && changes.valorAtual.currentValue) {
      this.inputControl.setValue(changes.valorAtual.currentValue);
    }
  }

  validarInput() {
    if (this.inputControl.valid) {
      this.input.emit(this.inputControl.value || '');
    }
  }
}
