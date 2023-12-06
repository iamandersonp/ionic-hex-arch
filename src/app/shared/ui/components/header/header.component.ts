import {
  Component,
  Input,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { LabelComponent } from '../label/label.component';
import { IconComponent } from '../icon/icon.component';
import { InternationalizationAdapter } from '@shared/infrastructure/adapters/internationalization-adapter';
import { TranslateMessagePipe } from '@shared/ui/utils/translate-message.pipe';

/**
 * Component to display the header with back button and title
 *
 * @export
 * @class HeaderComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule,
    LabelComponent,
    IconComponent,
    TranslateMessagePipe
  ]
})
export class HeaderComponent implements OnInit {
  /**
   * inject InternationalizationService
   *
   * @private
   * @type {InternationalizationAdapter}
   * @memberof HeaderComponent
   */
  private _l18nSrv: InternationalizationAdapter = inject(
    InternationalizationAdapter
  );

  /**
   * Input title to set the display tittle
   *
   * @type {string}
   * @memberof HeaderComponent
   */
  private _tittle: string = '';

  /**
   * Getter for the tittle
   *
   * @readonly
   * @type {string}
   * @memberof HeaderComponent
   */
  public get tittle(): string {
    return this._tittle;
  }

  /**
   * Setter for the tittle
   *
   * @memberof HeaderComponent
   */
  @Input() public set tittle(value: string) {
    this._tittle = value;
  }

  /**
   * input to set the header background color with ionic colors
   *
   * @type {string}
   * @memberof HeaderComponent
   */
  @Input() color: string = '';

  /**
   * input to display/hide the back button
   *
   * @type {boolean}
   * @memberof HeaderComponent
   */
  @Input() back?: boolean;

  /**
   * getter for the InternationalizationAdapter
   *
   * @readonly
   * @type {InternationalizationAdapter}
   * @memberof HeaderComponent
   */
  get l18nSrv(): InternationalizationAdapter {
    return this._l18nSrv;
  }

  /**
   * @ignore
   */
  ngOnInit() {}
}
