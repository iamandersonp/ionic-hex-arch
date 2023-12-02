import {
  Component,
  EnvironmentInjector,
  inject
} from '@angular/core';
import {
  RouterLinkActive,
  RouterLink
} from '@angular/router';
import { IonicModule } from '@ionic/angular';

/**
 * The root component of the application.
 *
 * @export
 * @class AppComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLinkActive, RouterLink]
})
export class AppComponent {
  /**
   * Injects the environment injector.
   *
   * @private
   * @type {EnvironmentInjector}
   * @memberof AppComponent
   */
  private _environmentInjector: EnvironmentInjector =
    inject(EnvironmentInjector);

  /**
   * Getter for the environment injector.
   *
   * @readonly
   * @type {EnvironmentInjector}
   * @memberof AppComponent
   */
  public get environmentInjector(): EnvironmentInjector {
    return this._environmentInjector;
  }
}
