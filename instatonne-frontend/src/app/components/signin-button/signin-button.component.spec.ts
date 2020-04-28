import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninButtonComponent } from './signin-button.component';

describe('SigninButtonComponent', () => {
  let component: SigninButtonComponent;
  let fixture: ComponentFixture<SigninButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
