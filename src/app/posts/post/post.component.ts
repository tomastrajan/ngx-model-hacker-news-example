import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DOWN_ARROW, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';

import { listTransitions } from '@app/core';

import { Post, PostsService } from '../posts.service';

@Component({
  selector: 'nmhne-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [listTransitions]
})
export class PostComponent implements OnInit {
  @Input() index: number;
  @Input() selected: boolean;
  @Input() post: Post;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.selected && event.keyCode === ESCAPE) {
      this.postsService.unselectPost();
    }
    if (this.selected && event.keyCode === DOWN_ARROW) {
      this.postsService.selectNextPost(this.post);
      event.stopImmediatePropagation();
    }
    if (this.selected && event.keyCode === UP_ARROW) {
      this.postsService.selectNextPost(this.post, false);
      event.stopImmediatePropagation();
    }
  }

  constructor(private postsService: PostsService) {}

  ngOnInit() {}

  onCommentsClick() {
    this.postsService.selectPost(this.post);
  }

  onActiveCommentsClick() {
    this.postsService.unselectPost();
  }
}
