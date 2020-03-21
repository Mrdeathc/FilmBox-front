import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeCComponent } from './episode-c.component';

describe('EpisodeCComponent', () => {
  let component: EpisodeCComponent;
  let fixture: ComponentFixture<EpisodeCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
