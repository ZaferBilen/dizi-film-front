import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, NgModel, FormsModule } from '@angular/forms';
import { ApiModule, KullaniciControllerService, KullaniciGirisRequests, KullaniciKayitRequests } from '../../../../dist/api-client-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ApiModule, NgIf, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);
  kullaniciService = inject(KullaniciControllerService);
  router = inject(Router);
  responseText: string = '';
  form: FormGroup;
  validationCode = ''
  showValidationScreen: boolean = false;
  count: number = 120;

  constructor() {
    this.form = this.fb.group(
      {
        name: ['Adınız', Validators.required],
        surname: ['Soyadınız', Validators.required],
        email: ['Mail-adresiniz', Validators.required],
        sifre: ['Şifreniz', Validators.required],
        role: ['NORMAL', Validators.required],
        geciciDogrulamaKodu: ['', Validators.required],
      }
    )
  }
  ngOnInit(): void {

  }

  showMessage: boolean = false;
  submit() {
    let req = this.form.controls['email'].value;
    this.kullaniciService.dogrulamaKodu(req).subscribe(res => {
      setInterval(() => {
        if (this.count !== 0) {
          this.count -= 1;
        } else {
          this.showValidationScreen = false;
        }
      }, 1000)
      this.showValidationScreen = true;
    })
  }

  register() {
    this.form.controls['geciciDogrulamaKodu'].setValue(this.validationCode);
    this.kullaniciService.register(this.form.value).subscribe(res => {
      this.showValidationScreen = false
      this.showMessage = true
    })
  }
}
