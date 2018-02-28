import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTileComponent } from './content-tile.component';

describe('ContentTileComponent', () => {
  let component: ContentTileComponent;
  let fixture: ComponentFixture<ContentTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
