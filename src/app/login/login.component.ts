import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AutenticacaoService } from '../_services/autenticacao.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error = '';

  constructor(
    private autenticacaoService: AutenticacaoService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private zone: NgZone,
    private router: Router) {

    if (this.autenticacaoService.currentUserValue) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  get form() { return this.loginForm.controls; }


  fazerLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.autenticacaoService.login(this.form.username.value, this.form.senha.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['']);
        },
        error => {
          this.error = error;
        });
  }
}


