/* eslint-disable no-underscore-dangle */
import { Injectable, inject } from '@angular/core';
import { StorageAdapter } from './adapters/storage-adapter';
import { Storage } from '@ionic/storage-angular';
import { LoggerAdapter } from './adapters/logger-adapter';
import { environment } from '@src/environments/environment';

/**
 * handle the device internal DB
 *
 * @export
 * @class StorageService
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService extends StorageAdapter {
  /**
   * inject the storage service
   *
   * @private
   * @type {Storage}
   * @memberof StorageService
   */
  private _storage: Storage = inject(Storage);

  /**
   * inject the logger service
   *
   * @private
   * @type {LoggerAdapter}
   * @memberof StorageService
   */
  private _loggerService: LoggerAdapter =
    inject(LoggerAdapter);

  /**
   * Creates an instance of StorageService.
   * @memberof StorageService
   */
  constructor() {
    super();
    this.loggerService.init('StorageService()');
    this.init();
  }

  /**
   * get the storage instance
   *
   * @readonly
   * @type {Storage}
   * @memberof StorageService
   */
  public get storage(): Storage {
    return this._storage;
  }

  /**
   * get the logger service instance
   *
   * @readonly
   * @type {LoggerAdapter}
   * @memberof StorageService
   */
  public get loggerService(): LoggerAdapter {
    return this._loggerService;
  }

  /**
   * initialize the index db storage
   *
   * @return {*}  {Promise<void>}
   * @memberof StorageService
   */
  public async init(): Promise<void> {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    try {
      await this.storage.create();
    } catch (e) {
      this.loggerService.error(
        'StorageService() - init - ' + JSON.stringify(e)
      );
    }
  }

  /**
   * Check the stored DB version to see if there is a new versión
   * and delete the old to make new updates
   *
   * @private
   * @return {*}  {Promise<void>}
   * @memberof EmployeeDataService
   */
  async checkDbVersion(): Promise<void> {
    this.loggerService.start(
      'StorageService() - checkDbVersion'
    );
    let value: number;
    value =
      (await this.get(environment.storeKeys.DB_VERSION)) ||
      0;
    this.loggerService.debug(
      'StorageService() - checkDbVersion - DB version : ' +
        value
    );
    if (value < environment.dbVersion) {
      this.clear();
      this.set(
        environment.storeKeys.DB_VERSION,
        environment.dbVersion
      );
      this.loggerService.debug(
        'StorageService() - checkDbVersion - DB version updated to ' +
          environment.dbVersion
      );
    }
    this.loggerService.end(
      'StorageService() - checkDbVersion'
    );
  }

  /**
   * store a key with its value in the storage
   *
   * @param {string} key - the key to store
   * @param {*} value - the value of the key
   * @return {*}  {Promise<void>}
   * @memberof StorageService
   */
  public async set(key: string, value: any): Promise<void> {
    try {
      await this.storage.set(key, value);
    } catch (e) {
      this.loggerService.error(
        'StorageService - set() ' + JSON.stringify(e)
      );
    }
  }

  /**
   * obtain the value of a desired jey
   *
   * @param {string} key - the key to obtain
   * @return {*}  {Promise<any>}
   * @memberof StorageService
   */
  public async get(key: string): Promise<any> {
    try {
      return await this.storage.get(key);
    } catch (e) {
      this.loggerService.error(
        'StorageService() - get - ' + JSON.stringify(e)
      );
    }
  }

  /**
   * remove a key from the storage
   *
   * @param {string} key - the key to remove
   * @return {*}  {Promise<any>}
   * @memberof StorageService
   */
  public async remove(key: string): Promise<any> {
    try {
      return await this.storage.remove(key);
    } catch (e) {
      this.loggerService.error(
        'StorageService() - remove - ' + JSON.stringify(e)
      );
    }
  }

  /**
   * Remove Previous Saved data and store the new one
   *
   * @param {*} key - the key to store
   * @param {*} data - data to store
   * @return {*}  {Promise<void>}
   * @memberof StorageService
   */
  public async storeData(
    key: string,
    data: any
  ): Promise<void> {
    this.remove(key);
    this.set(key, data);
  }

  /**
   * clear all the keys in the storage indexDb
   *
   * @return {*}  {Promise<void>}
   * @memberof StorageService
   */
  public async clear(): Promise<void> {
    try {
      await this.storage.clear();
    } catch (e) {
      this.loggerService.error(
        'StorageService() - get - ' + JSON.stringify(e)
      );
    }
  }
}
