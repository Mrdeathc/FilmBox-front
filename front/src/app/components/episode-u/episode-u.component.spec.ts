import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeUComponent } from './episode-u.component';

describe('EpisodeUComponent', () => {
  let component: EpisodeUComponent;
  let fixture: ComponentFixture<EpisodeUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
