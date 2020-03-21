import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieUComponent } from './movie-u.component';

describe('MovieComponent', () => {
  let component: MovieUComponent;
  let fixture: ComponentFixture<MovieUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
