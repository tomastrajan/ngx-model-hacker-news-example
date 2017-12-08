import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { CommentComponent } from './comment.component';
import { PostsService } from '../posts.service';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [CoreModule, SharedModule],
        declarations: [CommentComponent],
        providers: [PostsService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = {
      id: 0,
      parent: 0,
      by: '',
      kids: [],
      time: 0,
      score: 0,
      timeSince: '',
      text: '',
      deleted: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
