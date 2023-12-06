import { Observable } from 'rxjs';

/**
 * Provider to handle generic http calls
 *
 * @export
 * @abstract
 * @class HttpAdapter
 */
export abstract class HttpAdapter {
  /**
   * Do a GET http call and return an Observable
   *
   * @abstract
   * @template T - Generic type to return
   * @param {string} url - the url to make the request
   * @param {*} [options] - options to send
   * @return {*}  {Observable<T>}
   * @memberof HttpAdapter
   */
  abstract get<T>(
    url: string,
    options?: any
  ): Observable<T>;

  /**
   * Do a POST http call and return an Observable
   *
   * @abstract
   * @template T - Generic type to return
   * @param {string} url - the url to make the request
   * @param {*} body - body to send
   * @param {*} [options] - options to send
   * @return {*}  {Observable<T>}
   * @memberof HttpAdapter
   */
  abstract post<T>(
    url: string,
    body: any,
    options?: any
  ): Observable<T>;

  /**
   * Do a PUT http call and return an Observable
   *
   * @abstract
   * @template T - Generic type to return
   * @param {string} url - the url to make the request
   * @param {*} body - body to send
   * @param {*} [options] - options to send
   * @return {*}  {Observable<T>}
   * @memberof HttpAdapter
   */
  abstract put<T>(
    url: string,
    body: any,
    options?: any
  ): Observable<T>;
}
