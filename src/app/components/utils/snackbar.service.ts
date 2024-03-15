import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) { }
  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, { duration: 2000 });
  }
}
