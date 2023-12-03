import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  LangChangeEvent,
  TranslateService
} from '@ngx-translate/core';
import { LoggerAdapter } from './adapters/logger-adapter';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { InternationalizationAdapter } from './adapters/internationalization-adapter';

/**
 * Handle the proper load of i18n internationalization files
 *
 * @export
 * @class InternationalizationService
 */
@Injectable({
  providedIn: 'root'
})
export class InternationalizationService extends InternationalizationAdapter {
  /**
   * inject the TranslateService
   *
   * @private
   * @type {TranslateService}
   * @memberof InternationalizationService
   */
  private translateSrv: TranslateService = inject(
    TranslateService
  );

  /**
   * inject the LoggerService
   *
   * @private
   * @type {LoggerAdapter}
   * @memberof InternationalizationService
   */
  private _loggerService: LoggerAdapter =
    inject(LoggerAdapter);

  /**
   * getter for LoggerService
   *
   * @readonly
   * @type {LoggerAdapter}
   * @memberof InternationalizationService
   */
  public get loggerService(): LoggerAdapter {
    return this._loggerService;
  }

  /**
   * inject the StorageService
   *
   * @private
   * @type {StorageService}
   * @memberof InternationalizationService
   */
  private _storage: StorageService = inject(StorageService);

  /**
   * getter for StorageService
   *
   * @readonly
   * @type {StorageService}
   * @memberof InternationalizationService
   */
  public get storage(): StorageService {
    return this._storage;
  }

  /**
   * inject the Title service
   *
   * @private
   * @type {Title}
   * @memberof InternationalizationService
   */
  private _titleService: Title = inject(Title);

  /**
   * getter for Title service
   *
   * @readonly
   * @type {Title}
   * @memberof InternationalizationService
   */
  public get titleService(): Title {
    return this._titleService;
  }

  /**
   * Creates an instance of InternationalizationService,
   * set the default language asnd handle tittle changes
   * @memberof InternationalizationService
   */
  constructor() {
    super();
    this.loggerService.init('InternationalizationService');
    this.checDefaultLanguage();
    this.handleTitleUpdates();
  }

  /**
   * Subscribe to the Title subscriptions to update the Page title
   *
   * @memberof InternationalizationService
   */
  async handleTitleUpdates() {
    this.loggerService.start(
      'InternationalizationService() - handleTitleUpdates()'
    );
    this.translateSrv.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        // Change page title when user changes language preference
        this.translateSrv
          .get('title')
          .subscribe((res: string) => {
            this.loggerService.debug(
              'InternationalizationService() - handleTitleUpdates() - title: ' +
                res
            );
            this.titleService.setTitle(res);
          });
      }
    );
  }

  /**
   * Check if the user has stored the defasult language
   * and if not it set acording to system navigator
   *
   * @private
   * @memberof InternationalizationService
   */
  async checDefaultLanguage() {
    this.loggerService.start(
      'InternationalizationService() - checDefaultLanguage()'
    );
    this.translateSrv.addLangs(environment.languages);
    const lng: string = await this.storage.get(
      environment.storeKeys.USER_LANGUAGE
    );
    if (lng && this.checkAvaibible(lng)) {
      this.loggerService.debug(
        'InternationalizationService - USER_LANGUAGE ' + lng
      );
      this.language = lng;
      this.setDefaultLng(this.language);
      this.useLanguage(this.language);
    } else {
      if (this.checkApiAvaible()) {
        const navigatorLng = navigator.language.substring(
          0,
          2
        );
        this.loggerService.debug(
          'InternationalizationService - navigator Language ' +
            navigatorLng
        );
        if (this.checkAvaibible(navigatorLng)) {
          this.language = navigatorLng;
        } else {
          this.language = environment.defaultLanguage;
        }
      } else {
        this.language = environment.defaultLanguage;
      }
      this.setDefaultLng(this.language);
      this.useLanguage(this.language);
    }
    this.loggerService.end(
      'InternationalizationService() - checDefaultLanguage()'
    );
  }

  /**
   * return an array wiyh the list of all avaibles languages
   *
   * @readonly
   * @type {string[]}
   * @memberof InternationalizationService
   */
  public get languages(): string[] {
    return this.translateSrv.getLangs();
  }

  /**
   * getter for Language propiety
   *
   * @type {string}
   * @memberof InternationalizationService
   */
  public override get language(): string {
    super.language = this.subject.getValue();
    return super.language;
  }

  /**
   * Setter for language propiety.
   * It store the user language in SQlite Device DB
   *
   * @memberof InternationalizationService
   */
  public override set language(value: string) {
    document.documentElement.lang = value;
    this.storage.remove(
      environment.storeKeys.USER_LANGUAGE
    );
    this.storage.set(
      environment.storeKeys.USER_LANGUAGE,
      value
    );
    super.language = value;
    this.subject.next(super.language);
    this.language$ = this.subject.asObservable();
  }

  /**
   * get a specific translation string
   *
   * @param {string} key - the index of the desired translation
   * @param {object} [params] - Optional object with the key and value to be assigned to the translation
   * @return {string} - The desired translation string
   * @memberof InternationalizationService
   */
  public getinstant(key: string, params?: object) {
    return this.translateSrv.instant(key, params);
  }

  /**
   * Check if the browser API for localization is avaible
   * acording to HTML 5,1 specifications https://html.spec.whatwg.org/multipage/system-state.html#language-preferences
   *
   * @return boolean
   * @memberof InternationalizationService
   */
  checkApiAvaible() {
    const avaible =
      window.Intl && typeof window.Intl === 'object';
    if (avaible) {
      this.loggerService.debug(
        'InternationalizationService - Api Available  '
      );
    }
    return avaible;
  }

  /**
   * check if a localization file exist and return a boolean
   *
   * @param {string} lng -  the localization keyword to check (en - es)
   * @return {boolean}
   * @memberof InternationalizationService
   */
  checkAvaibible(lng: string): boolean {
    return this.translateSrv.getLangs().includes(lng);
  }

  /**
   * Set the default localization language to a specific language
   *
   * @param lng the localization key to set as default (en -es)
   * @memberof InternationalizationService
   */
  setDefaultLng(lng: string) {
    this.translateSrv.setDefaultLang(lng);
    this.loggerService.debug(
      'InternationalizationService - setDefaultLang  ' + lng
    );
  }

  /**
   * Use a specific localization language
   *
   * @param lng the localization key to use (en -es)
   * @memberof InternationalizationService
   */
  useLanguage(lng: string) {
    const lang: string = this.checkAvaibible(lng)
      ? lng
      : environment.defaultLanguage;
    this.language = lang;
    this.translateSrv.use(lang);
  }

  /**
   * Return a translation with its corresponding value
   * asociated to a data objet
   *
   * @param label - The translation key to use as label
   * @param number - the number value to concatenate
   * @return string - String with the translated label and the value
   * @memberof InternationalizationService
   */
  setValueAndLabel(
    label: string,
    value: number | string
  ): string {
    let val: string;
    val = this.getinstant(label) + ': ';
    if (typeof value === 'string') {
      val += value;
    } else {
      val += value.toLocaleString('es', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      });
    }
    return val;
  }
}
