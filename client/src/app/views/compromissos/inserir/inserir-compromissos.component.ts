import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { toTitleCase } from '../../../app.component';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { CompromissoService } from '../services/compromisso.service';
import { InserirCompromisso } from '../models/compromisso.models';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { NgForOf, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-inserir-compromissos',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatError,
    MatDatepickerModule,
    MatSelectModule
  ],
  templateUrl: './inserir-compromissos.component.html',
  styleUrl: '../styles/compromissos.scss'
})

export class InserirCompromissosComponent implements OnInit {
  compromissoForm: FormGroup;
  isLocalDisabled = false;
  isLinkDisabled = true;

  contatos = [
    { id: 1, nome: 'Ana Júlia' },
    { id: 2, nome: 'Bruno Silva' },
    { id: 3, nome: 'Carlos Alberto' },
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private compromissoService: CompromissoService,
    private notificacao: NotificacaoService
  ) {
    this.compromissoForm = this.fb.group({
      assunto: ['', [ Validators.required, Validators.minLength(3) ]],
      local: ['', [ Validators.required, Validators.minLength(3) ]],
      tipoLocal: ['0', [ Validators.required ]],
      link: ['', Validators.required],
      data: ['', [ Validators.required ]],
      horaInicio: ['', [ Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) ]],
      horaTermino: ['', [ Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) ]],
      contatoId: [null, [ Validators.required, Validators.minLength(3) ]],
    });
  }

  ngOnInit(): void {
    this.onTipoLocalChange({ value: '0' });
    this.compromissoForm.get('tipoLocal')?.valueChanges.subscribe(value => {
      this.onTipoLocalChange(value);
    });
  }

  get assunto() { return this.compromissoForm.get('assunto'); }
  get local() { return this.compromissoForm.get('local'); }
  get tipoLocal() { return this.compromissoForm.get('tipoLocal'); }
  get link() { return this.compromissoForm.get('link'); }
  get data() { return this.compromissoForm.get('data'); }
  get horaInicio() { return this.compromissoForm.get('horaInicio'); }
  get horaTermino() { return this.compromissoForm.get('horaTermino'); }
  get contatoId() { return this.compromissoForm.get('contatoId'); }

  cadastrar() {
    if (this.compromissoForm.invalid) return;

    const novoCompromisso: InserirCompromisso = this.compromissoForm.value;
    this.formatarCompromisso(novoCompromisso);

    this.compromissoService.cadastrar(novoCompromisso).subscribe((res) => {
      this.notificacao.sucesso(
        `O Compromisso '${novoCompromisso.assunto}' foi cadastrado com sucesso!`
      );

      this.router.navigate(['/Compromissos']);
    });
  }

  onTipoLocalChange(event: any) {
    if (event.value === '0') {
      this.isLocalDisabled = false;
      this.isLinkDisabled = true;
      this.local!.enable();
      this.link!.disable();

      this.local?.setValidators([Validators.required, Validators.minLength(3)]);
      this.link?.clearValidators();
      this.link?.setValue('');
    } else {
      this.isLocalDisabled = true;
      this.isLinkDisabled = false;
      this.local!.disable();
      this.link!.enable();

      this.link?.setValidators([Validators.required, Validators.minLength(3)]);
      this.local?.clearValidators();
      this.local?.setValue('');
    }

    this.local?.updateValueAndValidity();
    this.link?.updateValueAndValidity();
  }

  private formatarCompromisso(novoCompromisso: InserirCompromisso) {
    novoCompromisso.assunto = toTitleCase(novoCompromisso.assunto);
    novoCompromisso.local = toTitleCase(novoCompromisso.local);
  }
}
