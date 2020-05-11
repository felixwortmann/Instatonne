import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSubscriptionsComponent } from './profile-subscriptions.component';

describe('ProfileSubscriptionsComponent', () => {
  let component: ProfileSubscriptionsComponent;
  let fixture: ComponentFixture<ProfileSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
