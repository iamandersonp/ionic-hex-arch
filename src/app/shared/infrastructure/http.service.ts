import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { LoggerAdapter } from './adapters/logger-adapter';
import { catchError } from 'rxjs/operators';
import { HttpAdapter } from './adapters/http-adapter';

/**
 * Provider to handle generic http calls
 *
 * @export
 * @class HttpService
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpAdapter {
  /**
   * inject the logger service
   *
   * @private
   * @type {LoggerAdapter}
   * @memberof HttpService
   */
  private logger: LoggerAdapter = inject(LoggerAdapter);

  /**
   * inject the http service
   *
   * @private
   * @type {HttpClient}
   * @memberof HttpService
   */
  private http: HttpClient = inject(HttpClient);

  /**
   * Creates an instance of HttpService.
   * @memberof HttpService
   */
  constructor() {
    super();
  }

  /**
   * do a GET http call and return an Observable
   *
   * @param {string} url = the url to make the request
   * @return {*}  {(Observable<T>)} - Return an Generic Observable that can be typed
   * @memberof HttpService
   */
  public get<T>(url: string): Observable<T> {
    return this.http
      .get<T>(url, { withCredentials: true })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.handleError('get', err)
        )
      );
  }

  /**
   * Do a Put http call and return an Observable
   *
   * @template T
   * @param {string} url = the url to make the request
   * @param {*} body - json body to send
   * @return {*}  {(Observable<T>)} - Return an Generic Observable that can be typed
   * @memberof HttpService
   */
  public put<T>(url: string, body?: any): Observable<T> {
    return this.http
      .put<T>(url, body, { withCredentials: true })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.handleError('put', err)
        )
      );
  }

  /**
   * Do a POST http call and return a generic observable
   *
   * @template T - the type of the observable
   * @param {string} url - url to send the request
   * @param {*} [body] - JSON body to send
   * @return {*}  {Observable<T>} - Return a generic Observable that can be typed
   * @memberof HttpService
   */
  public post<T>(url: string, body?: any): Observable<T> {
    return this.http
      .post<T>(url, body, { withCredentials: true })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.handleError('post', err)
        )
      );
  }

  /**
   * Handle the error of the http call
   *
   * @param {string} method - the method that was called
   * @param {HttpErrorResponse} error - the error
   * @return {*}
   * @memberof HttpService
   */
  public handleError(
    method: string,
    error: HttpErrorResponse
  ) {
    this.logger.error(
      `HttpService - ${method} - ${error.message}`
    );
    return throwError(error);
  }
}
