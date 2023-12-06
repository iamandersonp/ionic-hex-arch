import { Observable } from 'rxjs';
import { ShowDTO } from '../model/show.model';
import { GenericRepository } from './generic-repository';

/**
 *  Type of search to perform
 */
export type searchType = 'single' | 'multi';

/**
 * Repository with the generic methods for the show Display
 *
 * @export
 * @abstract
 * @class ShowRepository
 */
export abstract class ShowRepository extends GenericRepository {
  /**
  /**
   * Search a show by query
   *
   * @abstract
   * @param {string} query - query the name of the show to search
   * @param {searchType} [type] - type of search to perform
   * @return {*}  {Observable<ShowDTO[]>}
   * @memberof ShowRepository
   */
  abstract search(
    query: string,
    type?: searchType
  ): Observable<ShowDTO[]>;

  /**
   * Get a show by id
   *
   * @abstract
   * @param {number} id - id of the show to get
   * @param {('thetvdb' | 'IMDB')} db - database to use
   * @return {*}  {Observable<ShowDTO>}
   * @memberof ShowRepository
   */
  abstract getShow(
    id: number,
    db: 'thetvdb' | 'IMDB'
  ): Observable<ShowDTO>;
}
