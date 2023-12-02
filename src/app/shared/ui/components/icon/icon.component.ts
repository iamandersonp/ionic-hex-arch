import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

/**
 * Dumb component to add accesibility tagns and colors for ion icons
 *
 * @export
 * @class IconComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class IconComponent implements OnInit {
  /**
   * input propiety to set the icon
   *
   * @type {string}
   * @memberof IconComponent
   */
  @Input() name: string = '';

  /**
   * input propiety to set the slot of the icon. Default value is 'start'
   *
   * @type {string}
   * @memberof IconComponent
   */
  @Input() slot: 'start' | 'end' | 'icon-only' = 'start';

  /**
   * input propiety to set size of the icon. Default value is 'mediun
   *
   * @type {('mediun' | 'large' | 'small')}
   * @memberof IconComponent
   */
  @Input() size: 'mediun' | 'large' | 'small' = 'mediun';

  /**
   * @ignore
   */
  ngOnInit() {}
}
