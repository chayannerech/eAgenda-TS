import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-input-valor',
  standalone: true,
  imports: [
    NgIf,
    MatError,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './input-valor.component.html',
  styleUrl: '../../styles/despesas.scss',
  providers: [provideNgxMask()]
})

export class InputValorComponent {
  @Input() valorAtual: number = 0;
  @Output() inputValor = new EventEmitter<number>();

  inputControl = new FormControl(this.valorAtual, [
    Validators.required,
    Validators.min(1),
    Validators.max(999999)
  ]);

  incrementar() {
    const valorAtual = this.inputControl.value || 0;
    this.inputControl.setValue(valorAtual + 1);
    this.inputValor.emit(this.inputControl.value || 0);
  }

  decrementar() {
    const valorAtual = this.inputControl.value || 0;
    if (valorAtual > 0) {
      this.inputControl.setValue(valorAtual - 1);
      this.inputValor.emit(this.inputControl.value || 0);
    }
  }

  receberValor() {
    this.inputValor.emit(this.inputControl.value || 0);
  }

  ngOnChanges(changes: any) {
    if (changes.valorAtual && changes.valorAtual.currentValue) {
      this.inputControl.setValue(changes.valorAtual.currentValue);
    }
  }
}
