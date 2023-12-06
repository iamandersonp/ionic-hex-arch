import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Generic repository to handle the loading spinner and the error display
 *
 * @export
 * @abstract
 * @class GenericRepository
 */
export abstract class GenericRepository {
  /**
   * subject to handle the loading spinner status
   *
   * @private
   * @type {(BehaviorSubject<string | null>)}
   * @memberof GenericRepository
   */
  private _subjectLoading: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>('');

  /**
   * observable to subscribe in the template
   *
   * @private
   * @type {(Observable<string | null>)}
   * @memberof GenericRepository
   */
  private _loading$: Observable<string | null> =
    this.subjectLoading.asObservable();

  /**
   * subject to handle the error status display
   *
   * @private
   * @type {(BehaviorSubject<string | null>)}
   * @memberof GenericRepository
   */
  private _subjecError: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>('');

  /**
   * observable to subscribe in the template
   *
   * @type {(Observable<string | null>)}
   * @memberof GenericRepository
   */
  private _error$: Observable<string | null> =
    this.subjecError.asObservable();

  /**
   * Getter for the subjectLoading
   *
   * @type {(BehaviorSubject<
   *     string | null
   *   >)}
   * @memberof GenericRepository
   */
  public get subjectLoading(): BehaviorSubject<
    string | null
  > {
    return this._subjectLoading;
  }

  /**
   * Setter for the subjectLoading
   *
   * @memberof GenericRepository
   */
  public set subjectLoading(
    value: BehaviorSubject<string | null>
  ) {
    this._subjectLoading = value;
  }

  /**
   * Getter for the loading$
   *
   * @type {(Observable<string | null>)}
   * @memberof GenericRepository
   */
  public get loading$(): Observable<string | null> {
    return this._loading$;
  }

  /**
   * Setter for the loading$
   *
   * @memberof GenericRepository
   */
  public set loading$(value: Observable<string | null>) {
    this._loading$ = value;
  }

  /**
   * Getter for the subjecError
   *
   * @type {(BehaviorSubject<string | null>)}
   * @memberof GenericRepository
   */
  public get subjecError(): BehaviorSubject<string | null> {
    return this._subjecError;
  }

  /**
   * Setter for the subjecError
   *
   * @memberof GenericRepository
   */
  public set subjecError(
    value: BehaviorSubject<string | null>
  ) {
    this._subjecError = value;
  }

  /**
   * Getter for the error$
   *
   * @type {(Observable<string | null>)}
   * @memberof GenericRepository
   */
  public get error$(): Observable<string | null> {
    return this._error$;
  }

  /**
   * Setter for the error$
   *
   * @memberof GenericRepository
   */
  public set error$(value: Observable<string | null>) {
    this._error$ = value;
  }
}
