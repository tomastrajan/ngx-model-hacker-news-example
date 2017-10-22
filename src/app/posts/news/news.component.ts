import { Component, OnInit } from '@angular/core';

import { PostsService } from '../posts.service';

@Component({
  selector: 'nmhne-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  constructor(postsService: PostsService) {}

  ngOnInit() {}
}
