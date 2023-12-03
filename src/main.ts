import {
  enableProdMode,
  importProvidersFrom
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  RouteReuseStrategy,
  provideRouter
} from '@angular/router';
import {
  BrowserModule,
  bootstrapApplication
} from '@angular/platform-browser';
import {
  IonicRouteStrategy,
  IonicModule
} from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import {
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { SharedProvidersModule } from '@shared/shared-providers.module';

if (environment.production) {
  enableProdMode();
}
/**
 * loader for the internationalization service
 *
 * @export
 * @param {HttpClient} http
 * @return {*}  {TranslateHttpLoader}
 */
export function httpLoaderFactory(
  http: HttpClient
): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
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
      SharedProvidersModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      IonicStorageModule.forRoot({
        name: '__TV_MAZE_APP',
        driverOrder: [
          Drivers.IndexedDB,
          Drivers.LocalStorage
        ]
      })
    )
  ]
}).catch((err) => console.log(err));
