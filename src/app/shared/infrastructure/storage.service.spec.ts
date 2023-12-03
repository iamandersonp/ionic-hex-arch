import { TestBed } from '@angular/core/testing';
import { LoggerAdapter } from './adapters/logger-adapter';
import { Storage } from '@ionic/storage-angular';

import { StorageService } from './storage.service';

import { loggerService } from '../mocks/logger.service.mock';
import { storage } from '../mocks/storage.service.mock';
import { environment } from '../../../environments/environment';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LoggerAdapter,
          useValue: loggerService
        },
        {
          provide: Storage,
          useValue: storage
        }
      ]
    });
    service = TestBed.inject(StorageService);
    await service.init();
  });

  describe('service creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('should have a loggerService', () => {
      expect(service.loggerService).toBeTruthy();
    });
    it('should have a storage', () => {
      expect(service.storage).toBeTruthy();
    });
  });

  describe('init', () => {
    it('should call storage.create() on initialization', async () => {
      const initSpy = jest.spyOn(service, 'init');
      await service.init();
      expect(initSpy).toHaveBeenCalled();
      expect(storage.create).toHaveBeenCalled();
      expect(initSpy).toHaveBeenCalled();
    });
    it('should call storage.create() and throw exception', async () => {
      const initSpy = jest.spyOn(service, 'init');
      const storageCreateSpy = jest
        .spyOn(storage, 'create')
        .mockRejectedValueOnce('error');
      await service.init();
      expect(initSpy).toHaveBeenCalled();
      expect(storageCreateSpy).toHaveBeenCalled();
    });
  });

  describe('set', () => {
    it('should store key and value', () => {
      const key = 'testKey';
      const value = 'testValue';

      service.set(key, value);

      expect(storage.set).toHaveBeenCalledWith(key, value);
    });
    it('should store key and value and throw exception', () => {
      const key = 'testKey';
      const value = 'testValue';
      jest
        .spyOn(storage, 'set')
        .mockRejectedValueOnce('error');

      service.set(key, value);

      expect(storage.set).toHaveBeenCalledWith(key, value);
    });
  });

  describe('get', () => {
    it('should call storage.get method', async () => {
      jest
        .spyOn(storage, 'get')
        .mockResolvedValueOnce('value');
      const result = await service.get('key');
      expect(storage.get).toHaveBeenCalledWith('key');
      expect(result).toEqual('value');
    });
    it('should call storage.get method and throw exception', async () => {
      jest
        .spyOn(storage, 'get')
        .mockRejectedValueOnce('error');
      await service.get('key');
      expect(storage.get).toHaveBeenCalledWith('key');
    });
  });

  describe('remove', () => {
    it('should call storage.remove method', async () => {
      jest
        .spyOn(storage, 'remove')
        .mockResolvedValueOnce('key');
      await service.remove('key');
      expect(storage.remove).toHaveBeenCalledWith('key');
    });
    it('should call storage.remove method and throw exception', async () => {
      jest
        .spyOn(storage, 'remove')
        .mockRejectedValueOnce('error');
      await service.remove('key');
      expect(storage.remove).toHaveBeenCalledWith('key');
    });
  });

  describe('storeData', () => {
    it('should call remove and set method in storeData', async () => {
      jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce('key');
      jest.spyOn(service, 'set');
      await service.storeData('key', 'value');
      expect(service.remove).toHaveBeenCalledWith('key');
      expect(service.set).toHaveBeenCalledWith(
        'key',
        'value'
      );
    });
  });

  describe('clear', () => {
    it('should call storage.clear method', async () => {
      jest.spyOn(storage, 'clear');
      await service.clear();
      expect(storage.clear).toHaveBeenCalled();
    });
    it('should call storage.clear method and throw exception', async () => {
      jest
        .spyOn(storage, 'clear')
        .mockRejectedValueOnce('error');
      await service.clear();
      expect(storage.clear).toHaveBeenCalled();
    });
  });

  describe('checkDbVersion', () => {
    it('should call storage.get method and return version 1', async () => {
      const versionSpy = jest
        .spyOn(service, 'get')
        .mockResolvedValue(1);
      await service.checkDbVersion();
      expect(versionSpy).toHaveBeenCalledWith(
        environment.storeKeys.DB_VERSION
      );
    });
    it('should call storage.get method return version 0 and update to version 1', async () => {
      const versionSpy = jest
        .spyOn(service, 'get')
        .mockResolvedValue(0);
      const updateSpy = jest.spyOn(service, 'set');
      await service.checkDbVersion();
      expect(versionSpy).toHaveBeenCalledWith(
        environment.storeKeys.DB_VERSION
      );
      expect(updateSpy).toHaveBeenCalledWith(
        environment.storeKeys.DB_VERSION,
        environment.dbVersion
      );
    });
  });
});
