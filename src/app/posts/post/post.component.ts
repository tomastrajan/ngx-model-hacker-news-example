import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { listTransitions, ScrollService } from '@app/core';

import { Post, PostsService } from '../posts.service';

const HIDE_ANIMATION_DURATION = 300;

@Component({
  selector: 'nmhne-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [listTransitions]
})
export class PostComponent implements OnInit {
  @Input() index: number;
  @Input() post: Post;

  constructor(
    private postsService: PostsService,
    private scrollService: ScrollService,
    private el: ElementRef
  ) {}

  ngOnInit() {}

  select() {
    this.postsService.unselectPost();
    setTimeout(() => {
      this.scrollService.scrollToElementIfOffscreen(this.el);
      this.postsService.selectPost(this.post);
    }, HIDE_ANIMATION_DURATION);
  }

  unselect() {
    this.postsService.unselectPost();
    setTimeout(
      () => this.scrollService.scrollToElementIfOffscreen(this.el),
      HIDE_ANIMATION_DURATION
    );
  }
}
