import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { DiziControllerService, FilmControllerService } from '../../../../dist/api-client-lib';
import { SafePipe } from '../utils/safe-pipe';

@Component({
  selector: 'app-film-izle',
  standalone: true,
  imports: [NgFor, NgIf, MatButton, SafePipe],
  templateUrl: './film-izle.component.html',
  styleUrl: './film-izle.component.scss'
})
export class FilmIzleComponent {
  activatedRouter = inject(ActivatedRoute);
  film: any = Object.create(null);
  service = inject(FilmControllerService);
  router = inject(Router);
  activeBolum: any;
  activeId: any;

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(a => {
      this.activeId = a['id'];
      this.service.getFilmById(a['id']).subscribe(res => {
        this.film = res;
      }
      )
    })
  }
}
