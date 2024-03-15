import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { BackButtonDirective } from 'app/components/utils/back-button.directive';
import { AddBolumRequest, AdminGetAllDiziResponse, BolumControllerService, CreateDiziRequest, DiziBolumleriResponse, DiziControllerService, DiziIdUploadfragmanBody, DiziIdUploadkapakBody, UpdateBolumRequest } from '../../../../../dist/api-client-lib';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from 'app/components/utils/snackbar.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dizi-table',
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
          <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef> id </th>
              <td mat-cell *matCellDef="let element"> {{element.id}} </td>
          </ng-container>
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef> No. </th>
            <td mat-cell *matCellDef="let element"> {{element.name}} </td>
          </ng-container>
          <ng-container matColumnDef="konu">
            <th mat-header-cell *matHeaderCellDef> konu </th>
            <td mat-cell *matCellDef="let element"> {{element.konu}} </td>
          </ng-container>
          <ng-container matColumnDef="diziCategoryName">
            <th mat-header-cell *matHeaderCellDef> diziCategoryName </th>
            <td mat-cell *matCellDef="let element"> {{element.diziCategoryName}} </td>
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
      <h1 style="color: black!important">Dizi Ekle</h1>
      Kapak : 
      <input type="file" (change)="onKapakSelected($event)" name="file"  required />
      Fragman : 
      <input type="file" (change)="onFragmanSelected($event)" name="file"  required />
        <mat-form-field>
          <mat-label>name:</mat-label>
          <input formControlName="name" matInput>
        </mat-form-field>
        <mat-form-field>
          <mat-label>konu:</mat-label>
          <input formControlName="konu" matInput>
        </mat-form-field>
        <mat-form-field>
          <mat-label>diziCategoryId:</mat-label>
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
          <h3 style="color: black!important"> Bölüm Ekle</h3>
        <ng-container *ngFor="let bolumForm of bolums.controls ; let i = index" [formGroupName]="i">
            <div class="lesson-form-row">
            <input type="file" (change)="onBolumSelected($event)" name="file"  required />
                <mat-form-field appearance="fill">
                    <input matInput
                           formControlName="bolum"
                           placeholder="Bölüm ismi">
                </mat-form-field>
                <i (click)="deleteLesson(i)" class="fa-solid fa-trash sil"></i>
            </div>
        </ng-container>
    </ng-container>
   
    <button type="button" mat-raised-button (click)="addLesson()">
        add
    </button>
        <button mat-raised-button color="primary" type="submit">Ekle</button>
      </div>
    </form>
        </div>
      </div>
  </div>
  </div>

  

  `,
  styleUrl: './dizi-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiziTableComponent implements OnInit {
  deleteDizi(element: any) {
    console.log(element);
    this.diziService.deleteDizi(element).subscribe(res => {
      this.getDizi();
      this.cdr.detectChanges()
    })
  }

  snackbar = inject(SnackbarService);
  cdr = inject(ChangeDetectorRef);
  dataSource!: AdminGetAllDiziResponse[];
  diziService = inject(DiziControllerService);
  bolumService = inject(BolumControllerService);
  http = inject(HttpClient);
  displayedColumns: string[] = ['name', 'konu', 'diziCategoryName', 'bolum', 'actions'];
  form: FormGroup;
  selectedDizi: AdminGetAllDiziResponse = Object.create(null);

  constructor(private fb: FormBuilder) {
    this.form = fb.group(
      {
        kapak: [''],
        fragman: [''],
        name: [''],
        konu: [''],
        diziCategoryId: [''],
        yili: [''],
        yonetmen: [''],
        bolums: this.fb.array([])
      }
    )
  }

  getDizi() {
    this.diziService.adminGetAllDizi().subscribe(res => {
      this.dataSource = res;
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    this.getDizi()
  }

  addLesson() {
    const lessonForm = this.fb.group({
      bolum: ['', Validators.required],
    });

    this.bolums.push(lessonForm);
  }

  deleteLesson(lessonIndex: number) {
    this.bolums.removeAt(lessonIndex);
  }

  setForm() {
    this.selectedDizi.bolum?.forEach(bolum => {
      this.form = this.fb.group(
        {
          bolum: [bolum.bolum, Validators.required],
        }
      )
    })
  }


  edit() {
    let req: CreateDiziRequest = {
      diziCategoryDkid: this.form.controls['diziCategoryId'].value,
      konu: this.form.controls['konu'].value,
      name: this.form.controls['name'].value,
      yili: this.form.controls['yili'].value,
      yonetmen: this.form.controls['yonetmen'].value
    };

    this.diziService.addDizi(req).subscribe(res => {
      if (res) {
        // Kapak dosyasını yükle
        this.upload(this.kapak, `http://localhost:8080/dizi/admin/${res.id!}/upload-kapak`).then(kapakRes => {
          console.log('kapak eklendi');

        }).finally(() => {
          this.upload(this.fragman, `http://localhost:8080/dizi/admin/${res.id!}/upload-fragman`).then(fragmanRes => {
            console.log('Fragman yüklendi');
            this.snackbar.openSnackBar('Dizi Eklendi');
          }).finally(() => {
            this.addBolum(res.id);
            this.getDizi();
            this.cdr.detectChanges()
          })
        })
      }
    });
  }

  addBolum(a: any) {
    for (let i = 0; i < this.bolums.length; i++) {
      const req: AddBolumRequest = {
        bolum: this.bolums.at(i).get('bolum')!.value,
        diziId: a
      };
      this.bolumService.addBolum(req).subscribe(bolumRes => {
        this.upload(this.bolum[i], `http://localhost:8080/bolum/admin/${bolumRes.id!}/upload-bolum`).then(res => {
          console.log('BOLUM EKLENDİ');
        })
      });
    }
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
    this.setForm()
  }

  get bolums() {
    return this.form.controls["bolums"] as FormArray;
  }

  kapak!: File;
  fragman!: File;
  bolum: File[] = [];

  onKapakSelected(event: any): void {
    this.kapak = event.target.files[0];

  }
  onFragmanSelected(event: any): void {
    this.fragman = event.target.files[0];
  }
  onBolumSelected(event: any): void {
    const selectedFile: File = event.target.files[0];
    this.bolum.push(selectedFile);
  }
}
