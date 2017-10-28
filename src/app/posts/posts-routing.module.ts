import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListComponent } from './post-list/post-list.component';
import { PostsService } from './posts.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'top',
    pathMatch: 'full'
  },
  {
    path: 'top',
    component: PostListComponent,
    data: {
      title: 'Top'
    },
    resolve: {
      posts: PostsService
    }
  },
  {
    path: 'new',
    component: PostListComponent,
    data: {
      title: 'New'
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
