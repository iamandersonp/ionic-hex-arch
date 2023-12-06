import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '@shared/ui/components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateMessagePipe } from '@shared/ui/utils/translate-message.pipe';

/**
 * Dashboard page to show the list of shows
 *
 * @export
 * @class DashBoardPage
 * @implements {OnInit}
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    HeaderComponent,
    TranslateModule,
    TranslateMessagePipe
  ]
})
export class DashBoardPage implements OnInit {
  /**
   *  @ignore
   */
  ngOnInit() {}
}
