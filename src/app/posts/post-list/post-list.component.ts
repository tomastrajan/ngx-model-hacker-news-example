import { Component, OnInit } from '@angular/core';

import { PostsService } from '../posts.service';

@Component({
  selector: 'nmhne-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  constructor(public postsService: PostsService) {}

  ngOnInit() {}
}
