import { Injectable, inject } from '@angular/core';
import { ShowDTO } from '@core/domain/model/show.model';
import { ShowRepository } from '@core/domain/repositories/show-repository';
import { Observable } from 'rxjs';

/**
 * Implementation of the use case for shows
 *
 * @export
 * @class ShowsUsecaseService
 */
@Injectable({
  providedIn: 'root'
})
export class ShowsUsecaseService {
  /**
   * Inject dependency of ShowRepository
   *
   * @private
   * @type {ShowRepository}
   * @memberof ShowsUsecaseService
   */
  private _repository: ShowRepository =
    inject(ShowRepository);

  /**
   * Getter for ShowRepository
   *
   * @readonly
   * @type {ShowRepository}
   * @memberof ShowsUsecaseService
   */
  public get repository(): ShowRepository {
    return this._repository;
  }

  /**
   * getter for loading
   *
   * @readonly
   * @type {(Observable<string | null>)}
   * @memberof ShowsUsecaseService
   */
  public get loading$(): Observable<string | null> {
    return this.repository.loading$;
  }

  /**
   * getter for error
   *
   * @readonly
   * @type {(Observable<string | null>)}
   * @memberof ShowsUsecaseService
   */
  public get error$(): Observable<string | null> {
    return this.repository.error$;
  }

  /**
   * Get Shows by name
   *
   * @param {string} query
   * @return {*}
   * @memberof ShowsUsecaseService
   */
  getShows(query: string): Observable<ShowDTO[]> {
    return this.repository.search(query);
  }
}
