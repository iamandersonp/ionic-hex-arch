import { APP_INITIALIZER, NgModule } from '@angular/core';

import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { HttpAdapter } from './infrastructure/adapters/http-adapter';
import { HttpService } from './infrastructure/http.service';
import { LoggerAdapter } from './infrastructure/adapters/logger-adapter';
import { StorageAdapter } from './infrastructure/adapters/storage-adapter';
import { LoggerService } from './infrastructure/logger.service';
import { StorageService } from './infrastructure/storage.service';
import { InternationalizationAdapter } from './infrastructure/adapters/internationalization-adapter';
import { InternationalizationService } from './infrastructure/internationalization.service';

/**
 * Initialicethe translation service by preloading the language
 *
 * @export
 * @param {TranslateService} translate
 * @return {*}
 */
export function appInitializerFactory(
  storage: StorageAdapter
) {
  return async () => {
    await storage.checkDbVersion();
    return;
  };
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [StorageAdapter],
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: StorageAdapter,
      useClass: StorageService
    },
    {
      provide: LoggerAdapter,
      useClass: LoggerService
    },
    {
      provide: InternationalizationAdapter,
      useClass: InternationalizationService
    },
    {
      provide: HttpAdapter,
      useClass: HttpService
    }
  ]
})
export class SharedProvidersModule {}
