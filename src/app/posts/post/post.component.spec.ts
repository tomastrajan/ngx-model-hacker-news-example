import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { PostComponent } from './post.component';
import { PostsService } from '../posts.service';
import { CommentComponent } from '../comment/comment.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, SharedModule],
      declarations: [PostComponent, CommentComponent],
      providers: [PostsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.index = 0;
    component.post = {
      id: 0,
      url: '',
      domain: '',
      by: '',
      title: '',
      descendants: 0,
      kids: [],
      time: 0,
      timeSince: '',
      type: '',
      score: 0
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
