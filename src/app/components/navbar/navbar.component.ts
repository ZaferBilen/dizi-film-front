import { Component, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { AuthenticationGirisResponse, KullaniciControllerService } from '../../../../dist/api-client-lib';
import { NgIf } from '@angular/common';
import { LocalStorageService } from '../utils/local-storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  user!: AuthenticationGirisResponse;
  apiService = inject(KullaniciControllerService);
  localStorageService = inject(LocalStorageService)
  router = inject(Router);
  ngOnInit(): void {
    this.authService._currentUser.subscribe(res => {
      this.user = res!;
    });
  }

  logOut() {
    this.apiService.cikis().subscribe(res => {
      this.authService.setUser(null);
      this.localStorageService.removeItem('user');
      this.router.navigateByUrl('giris-yap');
    })
  }


}
