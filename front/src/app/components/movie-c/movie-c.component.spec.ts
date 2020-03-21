import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCComponent } from './movie-c.component';

describe('MovieCComponent', () => {
  let component: MovieCComponent;
  let fixture: ComponentFixture<MovieCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
