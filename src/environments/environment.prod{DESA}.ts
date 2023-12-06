/**
 * @ignore
 */
export const baseUrl = 'http://localhost:3000';

/**
 * Used to set enviroments reusable elements
 *
 * @ignore
 * @type {object}
 */
export const environment = {
  production: true,
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
