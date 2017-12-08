import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsService } from './posts.service';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  imports: [SharedModule, PostsRoutingModule],
  declarations: [PostListComponent, PostComponent, CommentComponent],
  providers: [PostsService]
})
export class PostsModule {}
