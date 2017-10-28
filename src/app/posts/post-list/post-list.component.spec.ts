import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { PostListComponent } from './post-list.component';
import { PostComponent } from '../post/post.component';
import { PostsService } from '../posts.service';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [CoreModule, SharedModule],
        providers: [PostsService],
        declarations: [PostListComponent, PostComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
