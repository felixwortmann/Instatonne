import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHeaderStatsComponent } from './profile-header-stats.component';

describe('ProfileHeaderStatsComponent', () => {
  let component: ProfileHeaderStatsComponent;
  let fixture: ComponentFixture<ProfileHeaderStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileHeaderStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileHeaderStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
