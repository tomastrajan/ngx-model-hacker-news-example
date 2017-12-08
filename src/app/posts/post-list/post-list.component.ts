import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { listTransitions } from '@app/core';

import { Post, Posts, PostsService } from '../posts.service';

@Component({
  selector: 'nmhne-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  animations: [listTransitions]
})
export class PostListComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  posts: Posts;

  constructor(
    public postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.postsService.init(this.route.routeConfig.path);
    this.postsService.posts$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(posts => (this.posts = posts));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onLoadMoreClick() {
    this.postsService.loadMorePosts();
  }

  onCloseSelectedCommentsClick() {
    this.postsService.unselectPost();
  }
}
