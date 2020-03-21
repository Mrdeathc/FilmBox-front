import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieUComponent } from './serie-u.component';

describe('SerieUComponent', () => {
  let component: SerieUComponent;
  let fixture: ComponentFixture<SerieUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerieUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
