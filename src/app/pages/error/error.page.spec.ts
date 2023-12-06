import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { TranslateMessagePipeMock } from '../../shared/mocks/translate-message.pipe.mock';
import { TranslatePipeMock } from '../../shared/mocks/translate.pipe.mock';
import { InternationalizationAdapter } from '../../shared/infrastructure/adapters/internationalization-adapter';

import { ErrorPage } from './error.page';
import { loggerService } from '../../shared/mocks/logger.service.mock';
import { LoggerAdapter } from '../../shared/infrastructure/adapters/logger-adapter';

describe('ErrorPage', () => {
  let component: ErrorPage;
  let fixture: ComponentFixture<ErrorPage>;
  const l18nSrvMock = {
    useLanguage: jest.fn(),
    language: 'en'
  };
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

    fixture = TestBed.createComponent(ErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
