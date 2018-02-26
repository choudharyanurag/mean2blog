import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashpanelComponent } from './splashpanel.component';

describe('SplashpanelComponent', () => {
  let component: SplashpanelComponent;
  let fixture: ComponentFixture<SplashpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
