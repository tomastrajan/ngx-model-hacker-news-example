import { Component, Input, OnInit } from '@angular/core';

import { listTransitions } from '@app/core';

import { Comment, Post, PostsService } from '../posts.service';

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

  constructor(private postsService: PostsService) {}

  ngOnInit() {}

  onCommentsClick() {
    this.postsService.selectPost(this.post);
    this.postsService.loadComments(this.post);
  }

  onActiveCommentsClick() {
    this.postsService.unselectPost(this.post);
  }
}
