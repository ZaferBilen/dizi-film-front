import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { BackButtonDirective } from 'app/components/utils/back-button.directive';
import { SnackbarService } from 'app/components/utils/snackbar.service';
import { AdminGetAllFilmsResponse, DiziControllerService, BolumControllerService, CreateDiziRequest, FilmControllerService, CreateFilmRequest } from '../../../../../dist/api-client-lib';

@Component({
  selector: 'app-film-dizi',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    BackButtonDirective,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    NgFor
  ],
  template: `
  <div class="bg-white mt-5">
  <div class="container ">
  <button mat-raised-button color="primary" class="m-5" backButton> <-- Geri Dön</button>
  <div class="row">
    <div class="col-6">
      <table *ngIf="dataSource.length !== 0 " mat-table [dataSource]="dataSource " class="mat-elevation-z8">
          <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef> Film Adı </th>
              <td mat-cell *matCellDef="let element"> {{element.name}} </td>
          </ng-container>
          <ng-container matColumnDef="yili">
            <th mat-header-cell *matHeaderCellDef> Yıl. </th>
            <td mat-cell *matCellDef="let element"> {{element.yili}} </td>
          </ng-container>
          <ng-container matColumnDef="konu">
            <th mat-header-cell *matHeaderCellDef> Konu </th>
            <td mat-cell *matCellDef="let element"> {{element.konu}} </td>
          </ng-container>
          <ng-container matColumnDef="yonetmen">
            <th mat-header-cell *matHeaderCellDef> Yönetmen </th>
            <td mat-cell *matCellDef="let element"> {{element.yonetmen}} </td>
          </ng-container>

          <ng-container matColumnDef="bolum">
            <th mat-header-cell *matHeaderCellDef> Bölümler </th>
            <td mat-cell *matCellDef="let element">
             <ng-container *ngFor="let bolum of element.bolum"> 
             {{bolum.bolum}}, 
             </ng-container>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element">
            <button mat-raised-button color="warn" (click)="deleteDizi(element.id)">Sil</button>
          </td>
          </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns" ></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;" (click)="getRow(row)"></tr>
</table>
      </div>
      <div class="col-6 border p-5">
      <form [formGroup]="form" (ngSubmit)="edit()" class="mt-5">
      <div class="d-flex justify-content-center align-items-center flex-column">
      <h1 style="color: black!important">Film Ekle</h1>
      Kapak : 
      <input type="file" (change)="onKapakSelected($event)" name="file"  required />
      Fragman : 
      <input type="file" (change)="onFragmanSelected($event)" name="file"  required />
      Film Ekle
      <input type="file" (change)="onFilmSelected($event)" name="file"  required />
        <mat-form-field>
          <mat-label>name:</mat-label>
          <input formControlName="name" matInput>
        </mat-form-field>
        <mat-form-field>
          <mat-label>konu:</mat-label>
          <input formControlName="konu" matInput>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Kategori id:</mat-label>
          <input type="number" formControlName="diziCategoryId" matInput>
        </mat-form-field>
        <mat-form-field>
          <mat-label>yili:</mat-label>
          <input formControlName="yili" matInput>
        </mat-form-field>
        <mat-form-field>
          <mat-label>yonetmen:</mat-label>
          <input formControlName="yonetmen" matInput>
        </mat-form-field>
        <ng-container formArrayName="bolums">
    </ng-container>
        <button mat-raised-button color="primary" type="submit">Ekle</button>
      </div>
    </form>
        </div>
      </div>
  </div>
  </div>


  `,
  styleUrl: './film-dizi.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmTableComponent {

  deleteDizi(element: any) {
    console.log(element);
    this.diziService.deleteFilm(element).subscribe(res => {
      this.getFilm();
    })
  }
  cdr = inject(ChangeDetectorRef);
  snackbar = inject(SnackbarService);
  dataSource!: AdminGetAllFilmsResponse[];
  diziService = inject(FilmControllerService);
  http = inject(HttpClient);
  displayedColumns: string[] = ['name', 'konu', 'yonetmen', 'yili', 'actions'];
  form: FormGroup;
  selectedDizi: AdminGetAllFilmsResponse = Object.create(null);

  constructor(private fb: FormBuilder) {
    this.form = fb.group(
      {
        kapak: [''],
        fragman: [''],
        film: [''],
        name: [''],
        konu: [''],
        yili: [''],
        diziCategoryId: [''],
        yonetmen: [''],
      }
    )
  }
  getFilm() {
    this.diziService.adminGetAllFilms().subscribe(res => {
      this.dataSource = res;
      this.cdr.detectChanges()
    });
  }

  ngOnInit(): void {
    this.getFilm();
  }

  edit() {
    let req: CreateFilmRequest = {
      filmCategoryFkid: this.form.controls['diziCategoryId'].value,
      konu: this.form.controls['konu'].value,
      name: this.form.controls['name'].value,
      yili: this.form.controls['yili'].value,
      yonetmen: this.form.controls['yonetmen'].value
    };

    this.diziService.addFilm(req).subscribe(res => {
      if (res) {
        this.upload(this.kapak, `http://localhost:8080/film/admin/${res.id!}/upload-kapak`).then(kapakRes => {
          console.log('kapak eklendi');
        }).finally(() => {
          this.upload(this.fragman, `http://localhost:8080/film/admin/${res.id!}/upload-fragman`).then(fragmanRes => {
            console.log('Fragman yüklendi');
            this.upload(this.film, `http://localhost:8080/film/admin/${res.id!}/upload-film`).then(fragmanRes => {
              console.log('film yüklendi');
              this.getFilm();
            })
          })
        })
      }
    });
  }

  public upload(file: File, path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      this.http.post(path, formData, { reportProgress: true, observe: 'events', headers, responseType: 'text' }).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err)
        }
      })
    })
  }

  getRow(row: any) {
    this.selectedDizi = row;
  }

  kapak!: File;
  fragman!: File;
  film!: File;

  onKapakSelected(event: any): void {
    this.kapak = event.target.files[0];

  }
  onFragmanSelected(event: any): void {
    this.fragman = event.target.files[0];
  }
  onFilmSelected(event: any): void {
    this.film = event.target.files[0];
  }

}
