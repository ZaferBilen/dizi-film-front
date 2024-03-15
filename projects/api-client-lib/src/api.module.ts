import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { BolumControllerService } from './api/bolumController.service';
import { DiziCategoryControllerService } from './api/diziCategoryController.service';
import { DiziControllerService } from './api/diziController.service';
import { FavoriDizilerControllerService } from './api/favoriDizilerController.service';
import { FavoriFilmlerControllerService } from './api/favoriFilmlerController.service';
import { FilmCategoryControllerService } from './api/filmCategoryController.service';
import { FilmControllerService } from './api/filmController.service';
import { KullaniciControllerService } from './api/kullaniciController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    BolumControllerService,
    DiziCategoryControllerService,
    DiziControllerService,
    FavoriDizilerControllerService,
    FavoriFilmlerControllerService,
    FilmCategoryControllerService,
    FilmControllerService,
    KullaniciControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
