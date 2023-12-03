import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { InternationalizationAdapter } from './shared/infrastructure/adapters/internationalization-adapter';
import { l18nSrvMock } from './shared/mocks/l18ns.mock';
import { TranslateModule } from '@ngx-translate/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: InternationalizationAdapter,
          useValue: l18nSrvMock
        }
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initializa', () => {
    it('should create the app', () => {
      expect(component).toBeTruthy();
    });
    it(`should have l18nSrv instance`, () => {
      expect(component.l18nSrv).toBeTruthy();
    });
  });
});
