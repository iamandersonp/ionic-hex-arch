import { loggerService } from './../../shared/mocks/logger.service.mock';
import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { IonContent, IonicModule } from '@ionic/angular';

import { DebugerPage } from './debuger.page';
import { InternationalizationAdapter } from '../../shared/infrastructure/adapters/internationalization-adapter';
import { l18nSrvMock } from '../../shared/mocks/l18ns.mock';
import { TranslateModule } from '@ngx-translate/core';
import { LoggerAdapter } from '../../shared/infrastructure/adapters/logger-adapter';
import exp from 'constants';

describe('DashboardComponent', () => {
  let component: DebugerPage;
  let fixture: ComponentFixture<DebugerPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot()
      ],
      declarations: [IonContent],
      providers: [
        {
          provide: LoggerAdapter,
          useValue: loggerService
        },
        {
          provide: InternationalizationAdapter,
          useValue: l18nSrvMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DebugerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('Page creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it(`should have logger propiety'`, () => {
      expect(component.logger).toBeTruthy();
    });
    it(`should have l18nSrv propiety'`, () => {
      expect(component.l18nSrv).toBeTruthy();
    });
  });
});
