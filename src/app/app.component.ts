import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LocalStorageService } from './components/utils/local-storage.service';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  localStorageService = inject(LocalStorageService);
  authService = inject(AuthService);
  router = inject(ActivatedRoute)
  constructor() {

  }
  ngOnInit(): void {
    if (this.localStorageService.getItem('user')) {
      this.authService.setUser(JSON.parse(this.localStorageService.getItem('user')!))
    }
  }
  title = 'dizi-film';



}
