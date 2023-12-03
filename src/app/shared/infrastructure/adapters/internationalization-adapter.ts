import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

/**
 * Adapter to define the defaults methods that the Internationalization has to implement
 *
 * @export
 * @abstract
 * @class InternationalizationAdapter
 */
export abstract class InternationalizationAdapter {
  /**
   * store the current active language
   *
   * @private
   * @type {string}
   * @memberof InternationalizationAdapter
   */
  private _language: string = '';
  /**
   * return an array wiyh the list of all avaibles languages
   *
   * @readonly
   * @abstract
   * @type {string[]}
   * @memberof InternationalizationAdapter
   */
  abstract get languages(): string[];

  /**
   * getter for Language propiety
   *
   * @type {string}
   * @memberof InternationalizationAdapter
   */
  public get language(): string {
    return this._language;
  }

  /**
   * Setter for language propiety.
   * It store the user language in SQlite Device DB
   *
   * @memberof InternationalizationAdapter
   */
  public set language(value: string) {
    this._language = value;
  }

  /**
   * Subject used to store in memory the language
   *
   * @private
   * @memberof InternationalizationAdapter
   */
  private _subject = new BehaviorSubject<string>('');

  /**
   * Observable to subscribe in the template
   *
   * @private
   * @type {Observable<string>}
   * @memberof InternationalizationAdapter
   */
  private _language$: Observable<string> =
    this.subject.asObservable();

  /**
   * getter for the subject
   *
   * @memberof InternationalizationAdapter
   */
  public get subject(): BehaviorSubject<string> {
    return this._subject;
  }

  /**
   * setter for the subject
   *
   * @memberof InternationalizationAdapter
   */
  public set subject(value) {
    this._subject = value;
  }

  /**
   * getter for the observable
   *
   * @type {Observable<string>}
   * @memberof InternationalizationAdapter
   */
  public get language$(): Observable<string> {
    return this._language$;
  }

  /**
   * setter for the observable
   *
   * @memberof InternationalizationAdapter
   */
  public set language$(value: Observable<string>) {
    this._language$ = value;
  }

  /**
   * Subscribe to the Title subscriptions to update the Page title
   *
   * @abstract
   * @return {*}  {Promise<void>}
   * @memberof InternationalizationAdapter
   */
  abstract handleTitleUpdates(): Promise<void>;

  /**
   * Check if the user has stored the defasult language
   * and if not it set acording to system navigator
   *
   * @abstract
   * @return {*}  {Promise<void>}
   * @memberof InternationalizationAdapter
   */
  abstract checDefaultLanguage(): Promise<void>;

  /**
   * get a specific translation string
   *
   * @abstract
   * @param {string} key - the index of the desired translation
   * @param {object} [params] - Optional object with the key and value to be assigned to the translation
   * @return {*} {string} - The desired translation string
   * @memberof InternationalizationAdapter
   */
  abstract getinstant(key: string, params?: object): any;

  /**
   * Check if the browser API for localization is avaible
   * acording to HTML 5,1 specifications https://html.spec.whatwg.org/multipage/system-state.html#language-preferences
   *
   * @abstract
   * @return {*} {boolean} - true if the API is avaible
   * @memberof InternationalizationAdapter
   */
  abstract checkApiAvaible(): boolean;

  /**
   * check if a localization file exist and return a boolean
   *
   * @abstract
   * @param {string} lng -  the localization keyword to check (en - es)
   * @return {*} {boolean} true if the localization file exist
   * @memberof InternationalizationAdapter
   */
  abstract checkAvaibible(lng: string): boolean;

  /**
   * Set the default localization language to a specific language
   *
   * @abstract
   * @param lng the localization key to use (en -es)
   * @memberof InternationalizationAdapter
   */
  abstract setDefaultLng(lng: string): void;

  /**
   * Use a specific localization language
   *
   * @abstract
   * @param lng the localization key to use (en -es)
   * @memberof InternationalizationAdapter
   */
  abstract useLanguage(lng: string): void;

  /**
   * Return a translation with its corresponding value
   * asociated to a data objet
   *
   * @abstract
   * @param {string} label - The translation key to use as label
   * @param {(number | string)} value - the number value to concatenate
   * @return {*}  {string} - String with the translated label and the value
   * @memberof InternationalizationAdapter
   */
  abstract setValueAndLabel(
    label: string,
    value: number | string
  ): string;
}
