import {
  enableProdMode,
  importProvidersFrom
} from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import {
  BrowserModule,
  bootstrapApplication
} from '@angular/platform-browser';
import {
  IonicRouteStrategy,
  IonicModule
} from '@ionic/angular';
import {
  RouteReuseStrategy,
  provideRouter
} from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { SharedProvidersModule } from '@shared/shared-providers.module';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      IonicModule.forRoot(),
      IonicStorageModule.forRoot({
        name: '__TV_MAZE_APP',
        driverOrder: [
          Drivers.IndexedDB,
          Drivers.LocalStorage
        ]
      }),
      SharedProvidersModule
    )
  ]
}).catch((err) => console.log(err));
