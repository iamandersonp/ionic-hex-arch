import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header.component';
import { TranslateModule } from '@ngx-translate/core';
import { InternationalizationAdapter } from '../../../infrastructure/adapters/internationalization-adapter';
import { TranslateMessagePipeMock } from '../../../mocks/translate-message.pipe.mock';
import { TranslatePipeMock } from '../../../mocks/translate.pipe.mock';
import { LoggerAdapter } from '../../../infrastructure/adapters/logger-adapter';
import { loggerService } from '../../../mocks/logger.service.mock';
import { l18nSrvMock } from '../../../mocks/l18ns.mock';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TranslatePipeMock,
        TranslateMessagePipeMock
      ],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot()
      ],
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

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should have l18nSrv property', () => {
      expect(component.l18nSrv).toBeTruthy();
      expect(component.l18nSrv).toEqual(l18nSrvMock);
    });
  });
});
