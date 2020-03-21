import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSeriesComponent } from './content-series.component';

describe('ContentSeriesComponent', () => {
  let component: ContentSeriesComponent;
  let fixture: ComponentFixture<ContentSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
