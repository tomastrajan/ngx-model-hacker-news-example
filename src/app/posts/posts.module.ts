import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsService } from './posts.service';
import { NewsComponent } from './news/news.component';
import { PostComponent } from './post/post.component';

@NgModule({
  imports: [SharedModule, PostsRoutingModule],
  declarations: [NewsComponent, PostComponent],
  providers: [PostsService]
})
export class PostsModule {}
