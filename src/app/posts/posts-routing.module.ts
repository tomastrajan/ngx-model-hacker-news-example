import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListComponent } from './post-list/post-list.component';

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
    }
  },
  {
    path: 'new',
    component: PostListComponent,
    data: {
      title: 'New'
    }
  },
  {
    path: 'ask',
    component: PostListComponent,
    data: {
      title: 'Ask'
    }
  },
  {
    path: 'show',
    component: PostListComponent,
    data: {
      title: 'Show'
    }
  },
  {
    path: 'job',
    component: PostListComponent,
    data: {
      title: 'Job'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
