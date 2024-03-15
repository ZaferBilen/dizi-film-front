import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AdminGetAllCategoryResponse, AdminGetAllDiziCategoryResponse, CreateDiziCategoryRequest, CreateDiziRequest, CreateFilmCategoryRequest, CreateFilmRequest, DiziCategoryControllerService, FilmCategoryControllerService, KullaniciControllerService, KullaniciGirisRequests } from '../../../../../dist/api-client-lib';
import { SnackbarService } from 'app/components/utils/snackbar.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-dizi',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgFor,
    NgIf
  ],
  template: `
  @if (categories && categories.length !==0 ) {
    <div *ngFor="let bolumForm of categories">
          <p> <b>Id</b> : {{bolumForm.dkid}} </p>
          <p> <b>Name</b> : {{bolumForm.name}} </p>
          <hr>
    </div>
  }
    <form [formGroup]="categoryform" (ngSubmit)="submit()" class="mt-5">
      <div class="d-flex justify-content-center align-items-center flex-column">
      <h1>Kategori Ekle</h1>
        <mat-form-field>
          <mat-label>Kategori Ekle:</mat-label>
          <input formControlName="name" matInput>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit">Ekle</button>
      </div>
    </form>
  `,
  styleUrl: './add-dizi.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddDiziComponent implements OnInit {
  categories !: AdminGetAllDiziCategoryResponse[];

  fb = inject(FormBuilder);
  snackbar = inject(SnackbarService);
  kategoryService = inject(DiziCategoryControllerService);
  responseText: string = '';
  categoryform: FormGroup;
  adddiziform: FormGroup;
  constructor() {
    this.categoryform = this.fb.group(
      {
        name: ['Kategori 1', Validators.required],
      }
    )
    this.adddiziform = this.fb.group(
      {
        name: ['', Validators.required],
        konu: ['', Validators.required],
        yili: ['', Validators.required],
        yonetmen: ['', Validators.required],
        diziCategoryId: ['', Validators.required],
      }
    )
  }
  ngOnInit(): void {
    this.getAllCategories();
  }
  submit() {
    let req: CreateDiziCategoryRequest = this.categoryform.value;
    console.log(req);

    this.kategoryService.add1(req).subscribe(res => {
      this.snackbar.openSnackBar('Kategori Eklendi')
    })
  }
  addFilm() {
    let req: CreateDiziRequest = this.adddiziform.value;
    console.log(req);

    this.kategoryService.add1(req).subscribe(res => {
      this.snackbar.openSnackBar('Kategori Eklendi')
    })
  }

  getAllCategories() {
    this.kategoryService.adminGetAllCategoryResponse1().subscribe(res => {
      this.categories = res;
      console.log(res);
    })
  }

}
