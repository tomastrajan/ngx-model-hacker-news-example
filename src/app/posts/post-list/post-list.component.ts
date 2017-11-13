import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { listTransitions } from '@app/core';

import { Post, PostsService } from '../posts.service';

@Component({
  selector: 'nmhne-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  animations: [listTransitions]
})
export class PostListComponent implements OnInit {
  constructor(
    public postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.postsService.init(this.route.routeConfig.path);
  }

  onLoadMoreClick() {
    this.postsService.loadMorePosts();
  }

  trackByPostId(index: number, post: Post) {
    return post.id;
  }
}
