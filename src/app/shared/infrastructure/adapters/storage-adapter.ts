import { Storage } from '@ionic/storage-angular';

/**
 * Storage adapter interface
 *
 * @export
 * @abstract
 * @class StorageAdapter
 */
export abstract class StorageAdapter {
  /**
   * Method to initialize the storage adapter
   *
   * @abstract
   * @return {*}  {Promise<void>}
   * @memberof StorageAdapter
   */
  abstract init(): Promise<void>;

  /**
   * Method to check the DB version
   *
   * @abstract
   * @return {*}  {Promise<void>}
   * @memberof StorageAdapter
   */
  abstract checkDbVersion(): Promise<void>;

  /**
   * Method to get a value from the storage
   *
   * @abstract
   * @param {string} key - the key to obtain
   * @return {*}  {Promise<any>}
   * @memberof StorageAdapter
   */
  abstract get(key: string): Promise<any>;

  /**
   * Method to set a value in the storage
   *
   * @abstract
   * @param {string} key - the key to store
   * @param {*} value - the value of the key
   * @return {*}  {Promise<void>}
   * @memberof StorageAdapter
   */
  abstract set(key: string, value: any): Promise<void>;

  /**
   * Method to remove a value from the storage
   *
   * @abstract
   * @param {string} key - the key to remove
   * @return {*}  {Promise<void>}
   * @memberof StorageAdapter
   */
  abstract remove(key: string): Promise<void>;

  /**
   * Method to clear the storage
   *
   * @abstract
   * @return {*}  {Promise<void>}
   * @memberof StorageAdapter
   */
  abstract clear(): Promise<void>;
}
