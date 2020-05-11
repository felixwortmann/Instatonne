import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorCommentComponent } from './author-comment.component';

describe('AuthorCommentComponent', () => {
  let component: AuthorCommentComponent;
  let fixture: ComponentFixture<AuthorCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
