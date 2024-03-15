import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationGirisResponse } from '../../../projects/api-client-lib/src';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _currentUser: BehaviorSubject<AuthenticationGirisResponse | null> = new BehaviorSubject<AuthenticationGirisResponse | null>(null)

  constructor() { }

  setUser(user: AuthenticationGirisResponse | null) {
    this._currentUser.next(user);
  }
}
