import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginLocationComponent } from './origin-location.component';

describe('OriginLocationComponent', () => {
  let component: OriginLocationComponent;
  let fixture: ComponentFixture<OriginLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
