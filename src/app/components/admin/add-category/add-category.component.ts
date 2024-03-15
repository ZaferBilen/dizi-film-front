import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { AdminGetAllCategoryResponse, CreateFilmCategoryRequest, CreateFilmRequest, FilmCategoryControllerService, KullaniciControllerService, KullaniciGirisRequests } from '../../../../../dist/api-client-lib';
import { SnackbarService } from 'app/components/utils/snackbar.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-category',
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
  <ng-container *ngIf="categories && categories.length !==0"> 
  <ng-container *ngFor="let bolumForm of categories ; let i = index">
          <p> <b>Id</b> : {{bolumForm.fkid}} </p>
          <p> <b>Name</b> : {{bolumForm.name}} </p>
          <hr>
    </ng-container>
</ng-container>
 
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
  styleUrl: './add-category.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCategoryComponent implements OnInit {
  fb = inject(FormBuilder);
  snackbar = inject(SnackbarService);
  kategoryService = inject(FilmCategoryControllerService);
  responseText: string = '';
  categoryform: FormGroup;
  addFilmform: FormGroup;
  categories !: AdminGetAllCategoryResponse[];
  constructor() {
    this.categoryform = this.fb.group(
      {
        name: ['Kategori 1', Validators.required],
      }
    )
    this.addFilmform = this.fb.group(
      {
        name: ['', Validators.required],
        konu: ['', Validators.required],
        yili: ['', Validators.required],
        yonetmen: ['', Validators.required],
        filmCategoryId: ['', Validators.required],
      }
    )
  }
  ngOnInit(): void {
    this.getAllCategories();
  }
  submit() {
    let req: CreateFilmCategoryRequest = this.categoryform.value;
    console.log(req);

    this.kategoryService.add(req).subscribe(res => {
      this.snackbar.openSnackBar('Kategori Eklendi')
    })
  }
  addFilm() {
    let req: CreateFilmRequest = this.addFilmform.value;
    console.log(req);

    this.kategoryService.add(req).subscribe(res => {
      this.snackbar.openSnackBar('Kategori Eklendi')
    })
  }
  getAllCategories() {
    this.kategoryService.adminGetAllCategoryResponse().subscribe(res => {
      this.categories = res;
      console.log(res);

    })
  }
}
