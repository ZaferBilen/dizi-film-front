import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AddDiziComponent } from '../add-dizi/add-dizi.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    CommonModule,
    AddCategoryComponent,
    AddDiziComponent,
    RouterModule,
    MatButtonModule
  ],
  template: `
    <div class="container mt-5">
      <div class="row">
        <div class="p-3">
          <button class="m-3" color="primary" mat-raised-button routerLink="/dizi-repo">Dizi Listesi</button>
         <button class="m-3" color="primary" mat-raised-button routerLink="/film-repo">Film Listesi</button>
        </div>
    
        <div class="col-6 mt-5 border">
          <h1 class="text-center">Film Kategorisi</h1>
            <app-add-category/>
        </div>
        <div class="col-6 mt-5 border">
        <h1 class="text-center">Dizi Kategorisi</h1>
           <app-add-dizi/>
        </div>
      </div>
    </div>
  `,
  styleUrl: './admin-home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHomeComponent {


}
