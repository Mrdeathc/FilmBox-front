import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeRComponent } from './episode-r.component';

describe('EpisodeRComponent', () => {
  let component: EpisodeRComponent;
  let fixture: ComponentFixture<EpisodeRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
