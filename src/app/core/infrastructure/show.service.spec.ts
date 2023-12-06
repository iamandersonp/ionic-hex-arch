import {
  RootShowDTO,
  ShowDTO
} from './../domain/model/show.model';
import { TestBed } from '@angular/core/testing';

import { ShowService } from './show.service';
import { HttpAdapter } from './../../shared/infrastructure/adapters/http-adapter';
import { mockHttpService } from './../../shared/mocks/http.service.mock';
import { LoggerAdapter } from './../../shared/infrastructure/adapters/logger-adapter';
import { loggerService } from './../../shared/mocks/logger.service.mock';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('ShowService', () => {
  let service: ShowService;
  let httpServiceMock: jest.Mocked<HttpAdapter>;
  const shows: RootShowDTO[] = [
    {
      score: 1,
      show: {
        id: 139,
        url: 'https://www.tvmaze.com/shows/139/girls',
        name: 'Girls',
        type: 'Scripted',
        language: 'English',
        genres: ['Drama', 'Romance'],
        status: 'Ended',
        runtime: 30,
        averageRuntime: 30,
        premiered: '2012-04-15',
        ended: '2017-04-16',
        officialSite: 'http://www.hbo.com/girls',
        schedule: { time: '22:00', days: ['Sunday'] },
        rating: { average: 6.5 },
        weight: 97,
        network: {
          id: 8,
          name: 'HBO',
          country: {
            name: 'United States',
            code: 'US',
            timezone: 'America/New_York'
          },
          officialSite: 'https://www.hbo.com/'
        },
        webChannel: {
          id: 3,
          name: 'Prime Video',
          country: null,
          officialSite: 'https://www.primevideo.com'
        },
        dvdCountry: null,
        externals: {
          tvrage: 30124,
          thetvdb: 220411,
          imdb: 'tt1723816'
        },
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg'
        },
        summary:
          '<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>',
        updated: 1611310521,
        _links: {
          self: {
            href: 'https://api.tvmaze.com/shows/139'
          },
          previousepisode: {
            href: 'https://api.tvmaze.com/episodes/1079686'
          }
        }
      }
    }
  ];
  const show: ShowDTO = {
    id: 139,
    url: 'https://www.tvmaze.com/shows/139/girls',
    name: 'Girls',
    type: 'Scripted',
    language: 'English',
    genres: ['Drama', 'Romance'],
    status: 'Ended',
    runtime: 30,
    averageRuntime: 30,
    premiered: '2012-04-15',
    ended: '2017-04-16',
    officialSite: 'http://www.hbo.com/girls',
    schedule: { time: '22:00', days: ['Sunday'] },
    rating: { average: 6.5 },
    weight: 97,
    network: {
      id: 8,
      name: 'HBO',
      country: {
        name: 'United States',
        code: 'US',
        timezone: 'America/New_York'
      },
      officialSite: 'https://www.hbo.com/'
    },
    webChannel: {
      id: 3,
      name: 'Prime Video',
      country: null,
      officialSite: 'https://www.primevideo.com'
    },
    dvdCountry: null,
    externals: {
      tvrage: 30124,
      thetvdb: 220411,
      imdb: 'tt1723816'
    },
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg'
    },
    summary:
      '<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>',
    updated: 1611310521,
    _links: {
      self: {
        href: 'https://api.tvmaze.com/shows/139'
      },
      previousepisode: {
        href: 'https://api.tvmaze.com/episodes/1079686'
      }
    }
  };
  const res = new HttpErrorResponse({
    error: 'test 404',
    status: 404,
    statusText: 'Not Found'
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpAdapter, useValue: mockHttpService },
        { provide: LoggerAdapter, useValue: loggerService }
      ]
    });
    service = TestBed.inject(ShowService);
    httpServiceMock = TestBed.inject(
      HttpAdapter
    ) as jest.Mocked<HttpAdapter>;
  });

  describe('service creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('should have a http property', () => {
      expect(service.http).toBeTruthy();
    });
    it('should have a logger property', () => {
      expect(service.logger).toBeTruthy();
    });
    it('should init logger', () => {
      expect(service.logger.init).toHaveBeenCalled();
      expect(service.logger.init).toHaveBeenCalledWith(
        'ShowService'
      );
    });
  });

  describe('search', () => {
    it('should call search multi and get data', (done) => {
      const httpSpy = jest
        .spyOn(httpServiceMock, 'get')
        .mockReturnValue(of(show));
      service.search('query').subscribe({
        next: (data) => {
          done();
        },
        error: (error) => {
          done();
        }
      });
      expect(httpSpy).toHaveBeenCalled();
    });
    it('should call search single and get data', (done) => {
      const httpSpy = jest
        .spyOn(httpServiceMock, 'get')
        .mockReturnValue(of(show));
      service.search('query', 'single').subscribe({
        next: (data) => {
          done();
        },
        error: (error) => {
          done();
        }
      });
      expect(httpSpy).toHaveBeenCalled();
    });
  });
  describe('getShow', () => {
    it('should call getShow from thetvdb and get data', (done) => {
      const httpSpy = jest
        .spyOn(httpServiceMock, 'get')
        .mockReturnValue(of(show));
      service.search('query').subscribe({
        next: (data) => {
          done();
        },
        error: (error) => {
          done();
        }
      });
      expect(httpSpy).toHaveBeenCalled();
    });
    it('should call getShow from IMDB and get data', (done) => {
      const httpSpy = jest
        .spyOn(httpServiceMock, 'get')
        .mockReturnValue(of(show));
      service.getShow(11111, 'IMDB').subscribe({
        next: (data) => {
          done();
        },
        error: (error) => {
          done();
        }
      });
      expect(httpSpy).toHaveBeenCalled();
    });
  });

  describe('dowloadMulti', () => {
    it('should call dowloadMulti and get data', (done) => {
      const httpSpy = jest
        .spyOn(httpServiceMock, 'get')
        .mockReturnValue(of(shows));
      service.dowloadMulti('query').subscribe({
        next: (data) => {
          done();
        },
        error: (error) => {
          done();
        }
      });
      expect(httpSpy).toHaveBeenCalled();
    });
    it('should call dowloadMulti and throw errop', (done) => {
      const httpSpy = jest
        .spyOn(httpServiceMock, 'get')
        .mockReturnValue(throwError(res));

      service.dowloadMulti('query').subscribe({
        next: (data) => {
          expect(data).toEqual(res);
          done();
        },
        error: (error) => {
          expect(error.message).toContain(res.statusText);
          expect(error.status).toBe(res.status);
          done();
        }
      });
      expect(httpSpy).toHaveBeenCalled();
    });
  });

  describe('dowloadSingle', () => {
    it('should call dowloadSingle and get data', (done) => {
      const httpSpy = jest
        .spyOn(httpServiceMock, 'get')
        .mockReturnValue(of(show));
      service.dowloadSingle('query').subscribe({
        next: (data) => {
          done();
        },
        error: (error) => {
          done();
        }
      });
      expect(httpSpy).toHaveBeenCalled();
    });
    it('should call dowloadSingle and throw errop', (done) => {
      const httpSpy = jest
        .spyOn(httpServiceMock, 'get')
        .mockReturnValue(throwError(res));

      service.dowloadSingle('query').subscribe({
        next: (data) => {
          expect(data).toEqual(res);
          done();
        },
        error: (error) => {
          expect(error.message).toContain(res.statusText);
          expect(error.status).toBe(res.status);
          done();
        }
      });
      expect(httpSpy).toHaveBeenCalled();
    });
  });
});
