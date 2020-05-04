import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionBottomSheetComponent } from './subscription-bottom-sheet.component';

describe('SubscriptionBottomSheetComponent', () => {
  let component: SubscriptionBottomSheetComponent;
  let fixture: ComponentFixture<SubscriptionBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
