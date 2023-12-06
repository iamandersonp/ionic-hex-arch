import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

/**
 * Dumb presentational component to display a loading animated bar
 *
 * @export
 * @class LoadingComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class LoadingComponent implements OnInit {
  /**
   * @ignore
   *
   * @memberof LoadingComponent
   */
  ngOnInit() {}
}
