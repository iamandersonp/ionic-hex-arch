import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashBoardPage } from './dashboard.page';
import { InternationalizationAdapter } from '../../shared/infrastructure/adapters/internationalization-adapter';
import { l18nSrvMock } from '../../shared/mocks/l18ns.mock';
import { TranslateModule } from '@ngx-translate/core';
import { ShowsUsecaseService } from './aplication/shows-usecase.service';
import { ShowRepository } from '../../core/domain/repositories/show-repository';

describe('DashboardComponent', () => {
  let component: DashBoardPage;
  let fixture: ComponentFixture<DashBoardPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: InternationalizationAdapter,
          useValue: l18nSrvMock
        },
        {
          provice: ShowsUsecaseService,
          useValue: {}
        },
        {
          provide: ShowRepository,
          useValue: { search: jest.fn() }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
