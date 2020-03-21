import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRComponent } from './movie-r.component';

describe('MovieRComponent', () => {
  let component: MovieRComponent;
  let fixture: ComponentFixture<MovieRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
