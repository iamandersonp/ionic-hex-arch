import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a icon Name', () => {
    component.name = 'home';
    expect(component.name).toBe('home');
  });

  it('should have a icon slot', () => {
    component.slot = 'start';
    expect(component.slot).toBe('start');
  });

  it('should have a icon size', () => {
    component.size = 'mediun';
    expect(component.size).toBe('mediun');
  });
});
