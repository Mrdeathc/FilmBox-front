import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusimpleComponent } from './menusimple.component';

describe('MenusimpleComponent', () => {
  let component: MenusimpleComponent;
  let fixture: ComponentFixture<MenusimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenusimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
