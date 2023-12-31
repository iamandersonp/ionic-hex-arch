// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
 * @ignore
 */
export const baseUrl = 'http://localhost:3000';

/**
 * @ignore
 */

export const environment = {
  production: false,
  timeOut: 10000,
  minInterval: 30000,
  showLogs: false,
  defaultLanguage: 'en',
  languages: ['en'],
  dbVersion: 1.0,
  logLevel: 0,
  baseUrl: 'https://api.tvmaze.com/',
  storeKeys: {
    DB_VERSION: 'db_version',
    USER_LANGUAGE: 'user_language'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
