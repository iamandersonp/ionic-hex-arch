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
import { MenuComponent } from '@shared/ui/components/menu/menu.component';
import {
  IntrefaceMenu,
  TipoLink
} from './shared/ui/components/menu/interface-menu';
import { InternationalizationAdapter } from '@shared/infrastructure/adapters/internationalization-adapter';

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
  imports: [
    IonicModule,
    RouterLinkActive,
    RouterLink,
    MenuComponent
  ]
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

  /**
   * inject the InternationalizationAdapter
   *
   * @private
   * @type {InternationalizationAdapter}
   * @memberof AppComponent
   */
  private _l18nSrv: InternationalizationAdapter = inject(
    InternationalizationAdapter
  );

  /**
   * Getter for the InternationalizationAdapter
   *
   * @readonly
   * @type {InternationalizationAdapter}
   * @memberof AppComponent
   */
  public get l18nSrv(): InternationalizationAdapter {
    return this._l18nSrv;
  }

  /**
   * TipoLink enum to use in the template.
   *
   * @type {typeof TipoLink}
   * @memberof AppComponent
   */
  public tipoLink: typeof TipoLink = TipoLink;

  /**
   * List of menu items.
   *
   * @type {IntrefaceMenu[]}
   * @memberof AppComponent
   */
  public menu: IntrefaceMenu[] = [
    {
      title: 'menu.home',
      url: ['/'],
      icon: 'home'
    }
  ];
}
