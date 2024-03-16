import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, NgModel, FormsModule } from '@angular/forms';
import { ApiModule, KullaniciControllerService, KullaniciGirisRequests, KullaniciKayitRequests } from '../../../../dist/api-client-lib';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

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
  kalanSureBittiMi: boolean = false;
  

  constructor() {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', Validators.required],
        sifre: ['', Validators.required],
        role: ['NORMAL', Validators.required],
        geciciDogrulamaKodu: ['', Validators.required],
      }
    )
  }
  ngOnInit(): void {
    console.log('Süre başladı:', new Date());
  }

  showMessage: boolean = false;
  submit() {
    let req = this.form.controls['email'].value;
    this.kullaniciService.dogrulamaKodu(req).subscribe(res => { 
        console.log('Doğrulama kodu işlemine geçildi:', new Date());
        timer(this.count * 1000).subscribe(() => {
            this.kalanSureBittiMi = true;
            console.log('Süre bitti:', new Date());


        }); 
        setInterval(() => {
            if (this.count !== 0) {
                this.count -= 1;
            } else {
                this.showValidationScreen = false;
            }
        }, 1000);
        
        this.showValidationScreen = true;

        if (res === 'success') {
          this.showMessage = true;
      }
    });
}

  register() {
    this.form.controls['geciciDogrulamaKodu'].setValue(this.validationCode);
    this.kullaniciService.register(this.form.value).subscribe(res => {
      this.showValidationScreen = false
      this.showMessage = true



    })
  }
}
