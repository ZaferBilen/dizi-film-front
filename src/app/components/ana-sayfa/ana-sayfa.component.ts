import { Component, OnInit, inject } from '@angular/core';
import { FilmControllerService } from '../../../../dist/api-client-lib';
import { AuthService } from 'app/services/auth.service';
import { DiziComponent } from '../dizi/dizi.component';
import { FilmComponent } from '../film/film.component';

@Component({
  selector: 'app-ana-sayfa',
  standalone: true,
  imports: [DiziComponent, FilmComponent],
  templateUrl: './ana-sayfa.component.html',
  styleUrl: './ana-sayfa.component.scss'
})
export class AnaSayfaComponent implements OnInit {
  filmService = inject(FilmControllerService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService._currentUser.subscribe(res => {
      console.log(res);
    })
  }

}
