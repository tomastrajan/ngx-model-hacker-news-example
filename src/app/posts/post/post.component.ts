import { Component, Input, OnInit } from '@angular/core';

import { Post } from '../posts.service';

@Component({
  selector: 'nmhne-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() index: number;
  @Input() post: Post;

  constructor() {}

  ngOnInit() {}
}
