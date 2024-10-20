import { NgIf, NgForOf, NgSwitch, NgSwitchCase, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; import { Router, RouterLink } from '@angular/router';

 @Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    RouterLink,
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
 })

 export class LoginComponent {
  form: FormGroup;

  constructor( private fb: FormBuilder, private router: Router ) {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get login() {
    return this.form.get('login');
  }
  get senha() {
    return this.form.get('senha');
  }

  public entrar() {
    if (this.form.invalid) return;
  }
}

