import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { GetAllDiziResponse, FavoriDizilerControllerService, DiziControllerService, DiziResponse, GeKullaniciFavoriteResponseDizi, KullaniciControllerService, RemoveFavoriDiziRequest } from '../../../../dist/api-client-lib';
import { AuthService } from 'app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { FragmanDialogComponent } from '../dialogs/fragman-dialog/fragman-dialog.component';

@Component({
  selector: 'app-dizi',
  standalone: true,
  imports: [NgFor, NgIf, MatButton],
  templateUrl: './dizi.component.html',
  styleUrl: './dizi.component.scss'
})
export class DiziComponent implements OnInit {

  dizis!: DiziResponse[];
  favoriService = inject(FavoriDizilerControllerService);
  favoriDizis!: GeKullaniciFavoriteResponseDizi[];
  kullaniciService = inject(KullaniciControllerService);
  dialog = inject(MatDialog);
  cdr = inject(ChangeDetectorRef);

  getDizi() {
    this.dizi.getAllDizi().subscribe(res => {
      this.dizis = res;
      this.cdr.detectChanges()
    });

    this.favoriService.getFavorilerByKullanici1().subscribe(res => {
      this.favoriDizis = res;
      this.cdr.detectChanges()
    })
  }

  ngOnInit(): void {
    this.getDizi();
  }
  dizi = inject(DiziControllerService);
  route = inject(Router);

  goToDizi(id: any) {
    this.route.navigate(['dizi-izle', id])
  }

  addFavori(id: any) {
    this.favoriService.addFavoriDizi(id).subscribe(res => {
      this.getDizi()
    })
  }

  check(name: any): boolean {
    return this.favoriDizis.filter(a => a.diziName === name).length !== 0 ? true : false
  }

  deleteFav(id: any) {
    let req: RemoveFavoriDiziRequest = {
      diziId: id
    }
    this.favoriService.removeFavoriteDizi(req).subscribe(res => {
      console.log(res);
      this.getDizi();
    })
  }


  goToFragman(fragmanPath: string) {
    const dialogRef = this.dialog.open(FragmanDialogComponent, {
      data: { fragmanPath: fragmanPath },
      width: '700px',
      height: '456px'
    });
  }
}
