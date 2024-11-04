import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-input-telefone',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxMaskDirective,
 ],
  templateUrl: './input-telefone.component.html',
  providers: [provideNgxMask()]
})
export class InputTelefoneComponent {
  @Input() valorAtual: string = '';
  @Output() inputTelefone = new EventEmitter<string>();

  inputControl = new FormControl('', [ Validators.required ]);

  ngOnChanges(changes: any) {
    if (changes.valorAtual && changes.valorAtual.currentValue) {
      this.inputControl.setValue(changes.valorAtual.currentValue);
    }
  }

  validarInput() {
    if (this.inputControl.valid) {
      this.inputTelefone.emit(this.inputControl.value || '');
    }
  }
}
