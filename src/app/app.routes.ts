import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AnaSayfaComponent } from './components/ana-sayfa/ana-sayfa.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { DiziTableComponent } from './components/admin/dizi-table/dizi-table.component';
import { FilmTableComponent } from './components/admin/film-dizi/film-dizi.component';
import { DiziIzleComponent } from './components/dizi-izle/dizi-izle.component';
import { FilmIzleComponent } from './components/film-izle/film-izle.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'giris-yap', pathMatch: 'full'
    },
    {
        path: 'giris-yap', component: LoginComponent
    },
    {
        path: 'kayıt-ol', component: RegisterComponent
    },
    {
        path: 'ana-sayfa', component: AnaSayfaComponent
    },
    {
        path: 'admin', component: AdminHomeComponent
    },
    {
        path: 'dizi-repo', component: DiziTableComponent
    },
    {
        path: 'film-repo', component: FilmTableComponent
    },
    {
        path: 'dizi-izle', component: DiziIzleComponent
    },
    {
        path: 'dizi-izle/:id/:bolum', component: DiziIzleComponent
    },
    {
        path: 'dizi-izle/:id', component: DiziIzleComponent
    },
    {
        path: 'film-izle/:id', component: FilmIzleComponent
    },

];
