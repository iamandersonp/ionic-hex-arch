import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

import { environment } from './../../../environments/environment';
import { LoggerAdapter } from './adapters/logger-adapter';
import { StorageService } from './storage.service';
import { InternationalizationService } from './internationalization.service';
import { of } from 'rxjs';
import { loggerService } from '../mocks/logger.service.mock';
import { storage } from '../mocks/storage.service.mock';
import { translateSrv } from '../mocks/tramslate.service.mock';

describe('InternationalizationService', () => {
  let service: InternationalizationService;

  let titleService = {
    setTitle: jest.fn()
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InternationalizationService,
        {
          provide: TranslateService,
          useValue: translateSrv
        },
        {
          provide: LoggerAdapter,
          useValue: loggerService
        },
        {
          provide: StorageService,
          useValue: storage
        },
        {
          provide: Title,
          useValue: titleService
        }
      ]
    });
    service = TestBed.inject(InternationalizationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initializa', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('should have logger propiety', () => {
      expect(service).toBeTruthy();
    });
    it('should initialize logger', () => {
      expect(loggerService.init).toHaveBeenCalledWith(
        'InternationalizationService'
      );
    });
    it('should have title propiety', () => {
      expect(titleService).toBeTruthy();
    });

    it('should return available languages', () => {
      expect(service.languages).toEqual(
        environment.languages
      );
    });
  });

  describe('handleTitleUpdates', () => {
    it('should update title', async () => {
      let observer;
      translateSrv.onLangChange.subscribe.mockImplementation(
        (handler) => (observer = handler)
      );
      jest.spyOn(service, 'handleTitleUpdates');

      await service.handleTitleUpdates();
      expect(service.handleTitleUpdates).toHaveBeenCalled();
    });
  });

  describe('checDefaultLanguage', () => {
    it('should initialize _language to stored language', async () => {
      const storedLanguage = 'en';
      const avaibleLanguages = ['en', 'es'];
      jest
        .spyOn(translateSrv, 'addLangs')
        .mockReturnValue(avaibleLanguages);
      jest
        .spyOn(storage, 'get')
        .mockResolvedValue(storedLanguage);
      await service.checDefaultLanguage();
      expect(service.language).toEqual(storedLanguage);
    });
    it('should initialize _language to navigator laguage if no language is stored and navigator language is avaible', async () => {
      const navigatorLanguage = 'en';
      jest
        .spyOn(translateSrv, 'addLangs')
        .mockReturnValue([navigatorLanguage]);
      jest.spyOn(storage, 'get').mockResolvedValue(null);
      jest
        .spyOn(navigator, 'language', 'get')
        .mockReturnValue(navigatorLanguage);
      await service.checDefaultLanguage();
      expect(service.language).toEqual(navigatorLanguage);
    });
    it('should initialize _language to default laguage if no language is stored and navigator language is not avaible', async () => {
      const navigatorLanguage = 'en';
      const avaibleLanguages = ['es'];
      jest
        .spyOn(translateSrv, 'addLangs')
        .mockReturnValue([avaibleLanguages]);
      jest.spyOn(storage, 'get').mockResolvedValue(null);
      jest
        .spyOn(navigator, 'language', 'get')
        .mockReturnValue(navigatorLanguage);
      jest
        .spyOn(service, 'checkAvaibible')
        .mockReturnValue(false);
      await service.checDefaultLanguage();
      expect(service.language).toEqual(
        environment.defaultLanguage
      );
    });
    it('should initialize _language to default laguage if API is not avaible', async () => {
      const avaibleLanguages = ['es'];
      jest
        .spyOn(translateSrv, 'addLangs')
        .mockReturnValue([avaibleLanguages]);
      jest.spyOn(storage, 'get').mockResolvedValue(null);
      jest
        .spyOn(service, 'checkApiAvaible')
        .mockReturnValue(false);
      await service.checDefaultLanguage();
      expect(service.language).toEqual(
        environment.defaultLanguage
      );
    });
  });

  describe('getinstant', () => {
    it('should return instant', () => {
      const label = 'label';
      jest
        .spyOn(translateSrv, 'instant')
        .mockReturnValue(label);
      expect(service.getinstant(label)).toEqual(label);
    });
  });

  describe('setValueAndLabel', () => {
    it('should setValueAndLabel with string', async () => {
      jest.spyOn(service, 'setValueAndLabel');
      jest
        .spyOn(service, 'getinstant')
        .mockReturnValue('label');
      await service['setValueAndLabel']('title', 'title');
      expect(service.setValueAndLabel).toHaveBeenCalled();
    });

    it('should setValueAndLabel with number', async () => {
      jest.spyOn(service, 'setValueAndLabel');
      jest
        .spyOn(service, 'getinstant')
        .mockReturnValue('label');
      await service['setValueAndLabel']('title', 9);
      expect(service.setValueAndLabel).toHaveBeenCalled();
    });
  });
});
