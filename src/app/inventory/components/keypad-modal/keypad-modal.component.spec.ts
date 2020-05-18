import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadModalComponent } from './keypad-modal.component';

describe('KeypadModalComponent', () => {
  let component: KeypadModalComponent;
  let fixture: ComponentFixture<KeypadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeypadModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
