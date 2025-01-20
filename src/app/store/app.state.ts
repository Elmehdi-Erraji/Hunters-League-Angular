// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {routes} from '../app.routes';
import {appStoreProviders} from './index';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ...appStoreProviders
    // other providers...
  ],
};
