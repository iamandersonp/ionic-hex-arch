import { environment } from '../../../environments/environment';
import { TestBed } from '@angular/core/testing';

import { LoggerService, LogLevel } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should init logEvents array with start message', () => {
    service = new LoggerService();
    expect(service.logEvents).toEqual([
      {
        text: expect.any(String),
        tipo: 'log-normal'
      }
    ]);
  });

  describe('init()', () => {
    it('should add service - Inicializa message to logEvents', () => {
      const spy = jest.spyOn(service, 'info');
      service.init('test-service');
      expect(spy).toHaveBeenCalledWith(
        'test-service - Init'
      );
    });
  });

  describe('start()', () => {
    it('should add service - Inicia message to logEvents', () => {
      const spy = jest.spyOn(service, 'info');
      service.start('test-service');
      expect(spy).toHaveBeenCalledWith(
        'test-service - Start'
      );
    });
  });

  describe('end()', () => {
    it('should add service - Finaliza message to logEvents', () => {
      const spy = jest.spyOn(service, 'info');
      service.end('test-service');
      expect(spy).toHaveBeenCalledWith(
        'test-service - End'
      );
    });
  });

  describe('debug()', () => {
    it('should add DEBUG message to logEvents if environment.logLevel <= LogLevel.DEBUG', () => {
      const spy = jest
        .spyOn(console, 'debug')
        .mockImplementation(() => {});
      jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});
      const previousLogLevel = environment.logLevel;
      environment.logLevel = LogLevel.DEBUG;
      service.debug('test-debug');
      expect(spy).toHaveBeenCalledWith(expect.any(String));
      expect(service.logEvents).toEqual([
        {
          text: expect.any(String),
          tipo: 'log-debug'
        },
        {
          text: expect.any(String),
          tipo: 'log-normal'
        }
      ]);
      environment.logLevel = previousLogLevel;
      spy.mockRestore();
    });
  });

  describe('warning()', () => {
    it('should add WARNING message to logEvents if environment.logLevel <= LogLevel.WARNING', () => {
      const spy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});
      jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});
      const previousLogLevel = environment.logLevel;
      environment.logLevel = LogLevel.WARNING;
      service.warning('test-warn');
      expect(spy).toHaveBeenCalledWith(expect.any(String));
      expect(service.logEvents).toEqual([
        {
          text: expect.any(String),
          tipo: 'log-warning'
        },
        {
          text: expect.any(String),
          tipo: 'log-normal'
        }
      ]);
      environment.logLevel = previousLogLevel;
      spy.mockRestore();
    });
  });

  describe('error()', () => {
    it('should add ERROR message to logEvents if environment.logLevel <= LogLevel.ERROR', () => {
      const spy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});
      const previousLogLevel = environment.logLevel;
      environment.logLevel = LogLevel.ERROR;
      service.error('test-error');
      expect(spy).toHaveBeenCalledWith(expect.any(String));
      expect(service.logEvents).toEqual([
        {
          text: expect.any(String),
          tipo: 'log-error'
        },
        {
          text: expect.any(String),
          tipo: 'log-normal'
        }
      ]);
      environment.logLevel = previousLogLevel;
      spy.mockRestore();
    });
  });
});
