import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

/**
 * Dumb component to add accesibility tags to labels
 *
 * @export
 * @class LabelComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class LabelComponent implements OnInit {
  /**
   * @ignore
   */
  ngOnInit() {}
}
