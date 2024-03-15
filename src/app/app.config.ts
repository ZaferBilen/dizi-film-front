import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiInterceptor } from './components/utils/api.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { APIS } from '../../dist/api-client-lib';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([
    ApiInterceptor
  ])), provideAnimationsAsync(), APIS,
]
};
