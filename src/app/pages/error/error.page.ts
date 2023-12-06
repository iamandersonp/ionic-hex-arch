import { CommonModule } from '@angular/common';
import {
  Component,
  EnvironmentInjector,
  OnInit,
  inject
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '@shared/ui/components/header/header.component';
import { TranslateMessagePipe } from '@shared/ui/utils/translate-message.pipe';

/**
 * This page display 404 errors to the user
 *
 * @export
 * @class ErrorPage
 * @implements {OnInit}
 */
@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    TranslateMessagePipe,
    RouterModule,
    HeaderComponent
  ]
})
export class ErrorPage implements OnInit {
  /**
   * inject the EnvironmentInjector
   *
   * @private
   * @type {EnvironmentInjector}
   * @memberof ErrorPage
   */
  private _environmentInjector: EnvironmentInjector =
    inject(EnvironmentInjector);

  /**
   * getter for EnvironmentInjector
   *
   * @type {EnvironmentInjector}
   * @memberof ErrorPage
   */
  public get environmentInjector(): EnvironmentInjector {
    return this._environmentInjector;
  }

  /**
   * setter for EnvironmentInjector
   *
   * @memberof ErrorPage
   */
  public set environmentInjector(
    value: EnvironmentInjector
  ) {
    this._environmentInjector = value;
  }

  /**
   * Creates an instance of ErrorPage.
   * @memberof ErrorPage
   */
  constructor() {}

  /**
   * Initialice the componene
   *
   * @memberof ErrorPage
   */
  ngOnInit() {}
}
