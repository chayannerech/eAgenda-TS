import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
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
  @Output() input = new EventEmitter();

  inputControl = new FormControl('', [ Validators.required ]);

  validarInput() {
    if (this.inputControl.valid) {
      this.input.emit(this.inputControl.value || '');
    }
  }
}
