import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiModule, KullaniciControllerService, KullaniciGirisRequests } from '../../../../dist/api-client-lib';
import { NgIf } from '@angular/common';
import { AuthService } from 'app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../utils/local-storage.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ApiModule, NgIf, RegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  kullaniciService = inject(KullaniciControllerService);
  authService = inject(AuthService);
  router = inject(Router);
  responseText: string = '';
  form: FormGroup;
  localStorageService = inject(LocalStorageService);
  activatedRouter = inject(ActivatedRoute);

  constructor() {
    this.form = this.fb.group(
      {
        email: ['Mail adresiniz', Validators.required],
        sifre: ['Şifreniz', Validators.required]
      }
    )
  }
  ngOnInit(): void {
    if (this.localStorageService.getItem('user')) {
      this.router.navigateByUrl('ana-sayfa');
    }
  }


  submit() {
    let req: KullaniciGirisRequests = this.form.value;

    this.kullaniciService.login(req).subscribe(res => {
      this.responseText = 'Başarı ile giriş yapıldı';
      this.authService.setUser(res);
      this.localStorageService.setItem('user', JSON.stringify(res))
      this.router.navigateByUrl('ana-sayfa')
    })
  }
}
