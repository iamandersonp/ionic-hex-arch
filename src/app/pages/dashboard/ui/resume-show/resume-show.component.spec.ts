import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ResumeShowComponent } from './resume-show.component';

describe('ResumeShowComponent', () => {
  let component: ResumeShowComponent;
  let fixture: ComponentFixture<ResumeShowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of([{ id: 1 }]),
            snapshot: { paramMap: { get: jest.fn() } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
