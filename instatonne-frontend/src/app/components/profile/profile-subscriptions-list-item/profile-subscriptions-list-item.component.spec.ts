import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSubscriptionsListItemComponent } from './profile-subscriptions-list-item.component';

describe('ProfileSubscriptionsListItemComponent', () => {
  let component: ProfileSubscriptionsListItemComponent;
  let fixture: ComponentFixture<ProfileSubscriptionsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSubscriptionsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSubscriptionsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
