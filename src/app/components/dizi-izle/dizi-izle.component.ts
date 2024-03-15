import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { DiziControllerService, DiziResponse, RemoveFavoriDiziRequest } from '../../../../dist/api-client-lib';
import { SafePipe } from '../utils/safe-pipe';

@Component({
  selector: 'app-dizi-izle',
  standalone: true,
  imports: [NgFor, NgIf, MatButton, SafePipe],
  templateUrl: './dizi-izle.component.html',
  styleUrl: './dizi-izle.component.scss',
})
export class DiziIzleComponent implements OnInit {

  activatedRouter = inject(ActivatedRoute);
  dizi: any = Object.create(null);
  service = inject(DiziControllerService);
  router = inject(Router);
  activeBolum: any;
  activeId: any;

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(a => {

      this.activeId = a['id'];
      this.service.getDiziById(a['id']).subscribe(res => {
        this.dizi = res;
        if (!a['bolum']) {
          this.activeBolum = this.dizi.bolum[0]
        } else {
          this.activeBolum = this.dizi.bolum.filter((b: any) => b.bolum === a['bolum'])[0];
        }
      }
      )
    })
  }

  changeBolum(name: any) {

    this.router.navigate(['/dizi-izle', this.activeId, name])
  }
}
