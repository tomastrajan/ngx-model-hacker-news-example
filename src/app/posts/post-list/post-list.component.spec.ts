import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { PostListComponent } from './post-list.component';
import { PostComponent } from '../post/post.component';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [CoreModule, SharedModule, RouterTestingModule],
        declarations: [PostListComponent, PostComponent],
        providers: [
          PostsService,
          { provide: ActivatedRoute, useValue: { routeConfig: {} } }
        ]
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
