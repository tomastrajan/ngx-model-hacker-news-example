import { Component, HostBinding, Input, OnInit } from '@angular/core';

import { listTransitions } from '@app/core';

import { Comment, PostsService } from '../posts.service';

@Component({
  selector: 'nmhne-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [listTransitions]
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input()
  @HostBinding('class.root')
  root = false;
  collapsed = false;
  descendants: number;

  constructor(private postsService: PostsService) {}

  ngOnInit() {}

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.descendants = this.postsService.getDescendantCount(this.comment);
  }
}
