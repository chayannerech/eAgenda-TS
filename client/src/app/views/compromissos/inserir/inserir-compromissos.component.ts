import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { toTitleCase } from '../../../app.component';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { CompromissoService } from '../services/compromisso.service';
import { InserirCompromisso } from '../models/compromisso.models';

@Component({
  selector: 'app-inserir-compromissos',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './inserir-compromissos.component.html',
  styleUrl: '../styles/compromissos.scss'
})

export class InserirCompromissosComponent {
  compromissoForm: FormGroup;

  constructor(
    private router: Router,
    private compromissoService: CompromissoService,
    private notificacao: NotificacaoService
  ) {
    this.compromissoForm = new FormGroup({
      assunto: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      local: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      tipoLocal: new FormControl<0>(0, [
        Validators.required,
      ]),
      link: new FormControl<string | null>(null
      ),
      data: new FormControl<Date | null>(null, [
        Validators.required,
      ]),
      horaInicio: new FormControl<string>('', [
        Validators.required,
        Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
      ]),
      horaTermino: new FormControl<string>('', [
        Validators.required,
        Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
      ]),
      contatoId: new FormControl<number | null>(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
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

  private formatarCompromisso(novoCompromisso: InserirCompromisso) {
    novoCompromisso.assunto = toTitleCase(novoCompromisso.assunto);
    novoCompromisso.local = toTitleCase(novoCompromisso.local);
  }
}
