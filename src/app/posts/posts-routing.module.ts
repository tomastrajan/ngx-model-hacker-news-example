import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListComponent } from './post-list/post-list.component';
import { PostsService } from './posts.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full'
  },
  {
    path: 'news',
    component: PostListComponent,
    data: {
      title: 'News'
    },
    resolve: {
      posts: PostsService
    }
  },
  {
    path: 'newest',
    component: PostListComponent,
    data: {
      title: 'Newest'
    },
    resolve: {
      posts: PostsService
    }
  },
  {
    path: 'ask',
    component: PostListComponent,
    data: {
      title: 'Ask'
    },
    resolve: {
      posts: PostsService
    }
  },
  {
    path: 'show',
    component: PostListComponent,
    data: {
      title: 'Show'
    },
    resolve: {
      posts: PostsService
    }
  },
  {
    path: 'job',
    component: PostListComponent,
    data: {
      title: 'Job'
    },
    resolve: {
      posts: PostsService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
