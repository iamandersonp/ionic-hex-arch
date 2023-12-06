import { Injectable, inject } from '@angular/core';
import { HttpAdapter } from '@shared/infrastructure/adapters/http-adapter';
import {
  RootShowDTO,
  ShowDTO
} from '@core/domain/model/show.model';
import {
  ShowRepository,
  searchType
} from '@core/domain/repositories/show-repository';
import { LoggerAdapter } from '@shared/infrastructure/adapters/logger-adapter';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { environment } from '@src/environments/environment';

/**
 * SImplementation of the show repository
 *
 * @export
 * @class ShowService
 * @extends {ShowRepository}
 */
@Injectable({
  providedIn: 'root'
})
export class ShowService extends ShowRepository {
  /**
   * Inject the HttpAdapter service
   *
   * @private
   * @type {HttpAdapter}
   * @memberof ShowService
   */
  private _http: HttpAdapter = inject(HttpAdapter);

  /**
   * Inject the LoggerAdapter service
   *
   * @private
   * @type {LoggerAdapter}
   * @memberof ShowService
   */
  private _logger: LoggerAdapter = inject(LoggerAdapter);

  /**
   * Creates an instance of ShowService.
   * @memberof ShowService
   */
  constructor() {
    super();
    this.logger.init('ShowService');
  }
  /**
   * Get the HttpAdapter service
   *
   * @readonly
   * @type {HttpAdapter}
   * @memberof ShowService
   */
  public get http(): HttpAdapter {
    return this._http;
  }

  /**
   * Get the LoggerAdapter service
   *
   * @readonly
   * @type {LoggerAdapter}
   * @memberof ShowService
   */
  public get logger(): LoggerAdapter {
    return this._logger;
  }

  /**
   * Search a show by query
   *
   * @param {string} query - query the name of the show to search
   * @param {searchType} [type] - type of search to perform
   * @return {*}  {Observable<ShowDTO[]>}
   * @memberof ShowRepository
   */
  override search(
    query: string,
    type: searchType = 'multi'
  ): Observable<ShowDTO[]> {
    this.logger.start('ShowService() - search');
    const url =
      type === 'multi'
        ? environment.baseUrl + `search/shows?q=${query}`
        : environment.baseUrl +
          `singlesearch/shows?q=${query}`;
    return this.dowloadMulti(url);
  }

  /**
   * Get a show by id
   *
   * @param {number} id - id of the show to get
   * @param {('thetvdb' | 'IMDB')} db - database to use
   * @return {*}  {Observable<ShowDTO>}
   * @memberof ShowRepository
   */
  override getShow(
    id: number,
    db: 'thetvdb' | 'IMDB' = 'thetvdb'
  ): Observable<ShowDTO> {
    this.logger.start('ShowService() - getShow');
    const url =
      db === 'thetvdb'
        ? environment.baseUrl + `lookup/shows?thetvdb=${id}`
        : environment.baseUrl + `lookup/shows?imdb=${id}`;
    return this.dowloadSingle(url);
  }

  /**
   * Download shows
   *
   * @param {string} url - url of the show to download
   * @return {*}  {Observable<ShowDTO[]>}
   * @memberof ShowService
   */
  dowloadMulti(url: string): Observable<ShowDTO[]> {
    this.logger.start('ShowService() - dowload');
    this.subjecError.next('');
    this.subjectLoading.next('loading');
    return this.http.get<RootShowDTO[]>(url).pipe(
      timeout(environment.timeOut),
      catchError((err) => {
        this.subjecError.next(err.message);
        this.logger.error(
          'ShowService() - dowload: ' +
            url +
            ' - ' +
            JSON.stringify(err)
        );
        return throwError(err);
      }),
      map((data) => {
        this.logger.debug(
          'ShowService() - dowload: ' +
            url +
            ' - ' +
            JSON.stringify(data)
        );
        const shows: ShowDTO[] = [];
        this.subjecError.next('');
        this.subjectLoading.next('done');
        this.logger.end('ShowService() - dowload');
        return shows;
      })
    );
  }

  /**
   * Dowload Single show
   *
   * @param {string} url - url of the show to download
   * @return {*}  {Observable<ShowDTO[]>}
   * @memberof ShowService
   */
  dowloadSingle(url: string): Observable<ShowDTO> {
    this.logger.start('ShowService() - dowload');
    return this.http.get<ShowDTO>(url).pipe(
      timeout(environment.timeOut),
      catchError((err) => {
        this.subjecError.next(err.message);
        this.logger.error(
          'ShowService() - dowload: ' +
            url +
            ' - ' +
            JSON.stringify(err)
        );
        return throwError(err);
      }),
      map((data: ShowDTO) => {
        this.logger.debug(
          'ShowService() - dowload: ' +
            url +
            ' - ' +
            JSON.stringify(data)
        );
        this.subjecError.next('');
        this.subjectLoading.next('done');
        this.logger.end('ShowService() - dowload');
        return data;
      })
    );
  }
}
