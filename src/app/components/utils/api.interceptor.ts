import { Injectable, inject } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpHandlerFn,
    HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'app/services/auth.service';
import { AuthenticationGirisResponse } from '../../../../dist/api-client-lib';
import { LocalStorageService } from './local-storage.service';

export function ApiInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    let authService = inject(AuthService);
    let localStorage = inject(LocalStorageService);
    let user!: AuthenticationGirisResponse;
    let token: any;
    if (localStorage.getItem('user')) {
        token = JSON.parse(localStorage.getItem('user')!).token;
        let url = req.url.replace('192.168.1.26:8080', 'localhost:8080');
        const dupReq = req.clone({
            url: url,
            headers: req.headers.set('Authorization', `Bearer ` + token),
        });
        return next(dupReq).pipe(tap(event => {
            if (event.type === HttpEventType.Response) {
                // console.log(req.url, 'returned a response with status', event.status);
            }
        }));
    } else {
        return next(req).pipe(tap(event => {
            if (event.type === HttpEventType.Response) {
                // console.log(req.url, 'returned a response with status', event.status);
            }
        }));
    }




}