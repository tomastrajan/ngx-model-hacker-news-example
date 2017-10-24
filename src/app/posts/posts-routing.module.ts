import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './news/news.component';
import { PostsService } from './posts.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full'
  },
  {
    path: 'news',
    component: NewsComponent,
    data: {
      title: 'News'
    },
    resolve: {
      posts: PostsService
    }
  },
  {
    path: 'newest',
    component: NewsComponent,
    data: {
      title: 'Newest'
    },
    resolve: {
      posts: PostsService
    }
  },
  {
    path: 'ask',
    component: NewsComponent,
    data: {
      title: 'Ask'
    },
    resolve: {
      posts: PostsService
    }
  },
  {
    path: 'show',
    component: NewsComponent,
    data: {
      title: 'Show'
    },
    resolve: {
      posts: PostsService
    }
  },
  {
    path: 'job',
    component: NewsComponent,
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
