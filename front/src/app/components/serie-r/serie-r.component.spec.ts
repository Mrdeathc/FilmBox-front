import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieRComponent } from './serie-r.component';

describe('SerieRComponent', () => {
  let component: SerieRComponent;
  let fixture: ComponentFixture<SerieRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerieRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
