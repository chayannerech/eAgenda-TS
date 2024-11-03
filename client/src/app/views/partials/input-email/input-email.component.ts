import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-email',
  standalone: true,
  imports: [ NgIf, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule ],
  templateUrl: './input-email.component.html'
})
export class InputEmailComponent implements OnChanges {
  @Input() placeholder: string = '';
  @Input() valorAtual: string = '';
  @Output() input = new EventEmitter<string>();

  label: string = '';

  inputControl = new FormControl(this.valorAtual, [
    Validators.required,
    Validators.minLength(3)
  ]);

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
