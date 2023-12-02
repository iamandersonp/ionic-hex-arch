import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { IonicModule, Platform } from '@ionic/angular';

import { MenuComponent } from './menu.component';
import { TranslateModule } from '@ngx-translate/core';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a Menu that contain 1 item', () => {
    component.appPages = [
      {
        title: 'menu.dashboard',
        url: ['/'],
        icon: 'home'
      }
    ];
    expect(component.appPages.length).toBe(1);
  });

  it('should call closeMenu', () => {
    const closeMenu = jest.spyOn(component, 'closeMenu');
    component.closeMenu();
    expect(closeMenu).toHaveBeenCalled();
  });

  it('should call ngOnInit', () => {
    const ngOnInit = jest.spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(ngOnInit).toHaveBeenCalled();
  });

  it('should call debug getter', () => {
    expect(component.debug).toBeFalsy();
  });

  it('should call debug setter', () => {
    component.debug = true;
    expect(component.debug).toBeTruthy();
  });

  describe('toggleDebug', () => {
    it('should call toggleDebug and set countClicks = 2', () => {
      const toggleDebug = jest.spyOn(
        component,
        'toggleDebug'
      );
      component.toggleDebug();
      expect(toggleDebug).toHaveBeenCalled();
      expect(component.countClicks).toBe(2);
    });
    it('should call toggleDebug 5 times and set debug true', () => {
      const toggleDebug = jest.spyOn(
        component,
        'toggleDebug'
      );
      component.toggleDebug();
      component.toggleDebug();
      component.toggleDebug();
      component.toggleDebug();
      component.toggleDebug();
      expect(toggleDebug).toHaveBeenCalled();
      expect(component.countClicks).toBe(0);
      expect(component.debug).toBeTruthy();
    });
  });
});
