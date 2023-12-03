import {
  Component,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from '../../shared/ui/components/header/header.component';
import { TranslateMessagePipe } from '../../shared/ui/utils/translate-message.pipe';
import { LoggerAdapter } from '../../shared/infrastructure/adapters/logger-adapter';
import { InternationalizationAdapter } from '../../shared/infrastructure/adapters/internationalization-adapter';
import { IconComponent } from '../../shared/ui/components/icon/icon.component';

/**
 * Dashboard page to show the list of shows
 *
 * @export
 * @class DashBoardPage
 * @implements {OnInit}
 */
@Component({
  selector: 'app-debuger',
  templateUrl: './debuger.page.html',
  styleUrls: ['./debuger.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    HeaderComponent,
    TranslateModule,
    TranslateMessagePipe,
    IconComponent
  ]
})
export class DebugerPage implements OnInit {
  /**
   * Inject LoggerAdapter
   *
   * @private
   * @type {LoggerAdapter}
   * @memberof LoggerPage
   */
  private _logger: LoggerAdapter = inject(LoggerAdapter);

  /**
   * Inject InternationalizationAdapter
   *
   * @private
   * @type {InternationalizationAdapter}
   * @memberof DebugerPage
   */
  private _l18nSrv: InternationalizationAdapter = inject(
    InternationalizationAdapter
  );

  /**
   * Getter for the InternationalizationService
   *
   * @readonly
   * @type {InternationalizationService}
   * @memberof LoggerPage
   */
  public get l18nSrv(): InternationalizationAdapter {
    return this._l18nSrv;
  }

  /**
   * Getter for LoggerAdapter
   *
   * @readonly
   * @type {LoggerAdapter}
   * @memberof DebugerPage
   */
  public get logger(): LoggerAdapter {
    return this._logger;
  }

  /**
   * Content of the page
   *
   * @type {IonContent}
   * @memberof LoggerPage
   */
  @ViewChild(IonContent, { static: true })
  content!: IonContent;

  /**
   *  @ignore
   */
  ngOnInit() {}

  /**
   * Scroll to the top of the page
   *
   * @memberof DebugerPage
   */
  goUp() {
    this.content.scrollToTop(1500);
  }

  /**
   * Scroll to the bottom of the page
   *
   * @memberof DebugerPage
   */
  goDown() {
    this.content.scrollToBottom(1500);
  }
}
