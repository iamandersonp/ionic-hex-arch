import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from '@shared/ui/components/header/header.component';
import { TranslateMessagePipe } from '@shared/ui/utils/translate-message.pipe';
import { LoadingComponent } from '@shared/ui/components/loading/loading.component';

import { ShowDTO } from '@core/domain/model/show.model';
import { ShowsUsecaseService } from './aplication/shows-usecase.service';
import { ResumeShowComponent } from './ui/resume-show/resume-show.component';

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
    CommonModule,
    RouterLink,
    IonicModule,
    HeaderComponent,
    TranslateModule,
    TranslateMessagePipe,
    ResumeShowComponent,
    LoadingComponent
  ]
})
export class DashBoardPage implements OnInit {
  /**
   * Inject the ShowsUsecaseService service
   *
   * @private
   * @type {ShowsUsecaseService}
   * @memberof DashBoardPage
   */
  private _showsService: ShowsUsecaseService = inject(
    ShowsUsecaseService
  );

  /**
   * Getter for ShowsUsecaseService
   *
   * @readonly
   * @type {ShowsUsecaseService}
   * @memberof DashBoardPage
   */
  public get showsService(): ShowsUsecaseService {
    return this._showsService;
  }

  /**
   * View model to be used on the template
   *
   * @type {(Observable<{
   *     data: Observable<ShowDTO[]>;
   *     remoteStatus: string | null;
   *     remoteError: string | null;
   *   }>)}
   * @memberof DashBoardPage
   */
  public vm$: Observable<{
    data: Observable<ShowDTO[]>;
    remoteStatus: string | null;
    remoteError: string | null;
  }> = combineLatest([
    of(this.showsService.getShows('gitls')),
    this.showsService.loading$,
    this.showsService.error$
  ]).pipe(
    map(([data, remoteStatus, remoteError]) => ({
      data,
      remoteStatus,
      remoteError
    }))
  );

  /**
   *  @ignore
   */
  ngOnInit() {}
}
