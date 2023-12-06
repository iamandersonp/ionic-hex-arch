import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShowDTO } from '@core/domain/model/show.model';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateMessagePipe } from '@shared/ui/utils/translate-message.pipe';

/**
 * Component to display a resume of a show
 *
 * @export
 * @class ResumeShowComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-resume-show',
  templateUrl: './resume-show.component.html',
  styleUrls: ['./resume-show.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonicModule,
    TranslateModule,
    TranslateMessagePipe
  ]
})
export class ResumeShowComponent implements OnInit {
  /**
   * Show to display
   *
   * @type {ShowDTO}
   * @memberof ResumeShowComponent
   */
  @Input() show?: ShowDTO;

  /**
   *  @ignore
   */
  ngOnInit() {}
}
