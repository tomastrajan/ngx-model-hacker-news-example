import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { ModelFactory, Model } from 'ngx-model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';

import { BackendService } from '@app/core';

const RESOURCES = {
  news: 'topstories.json',
  newest: 'newstories.json',
  show: 'showstories.json',
  job: 'jobstories.json',
  ask: 'askstories.json'
};

@Injectable()
export class PostsService implements Resolve<boolean> {
  private model: Model<Post[]>;
  posts$: Observable<Post[]>;

  constructor(
    private backend: BackendService,
    private modelFactory: ModelFactory<Post[]>
  ) {
    this.model = this.modelFactory.create([]);
    this.posts$ = this.model.data$;
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.backend
      .get(RESOURCES[route.routeConfig.path])
      .mergeMap((ids: any) =>
        Observable.forkJoin(
          ids
            .filter((id, index) => index < 10)
            .map(id => this.backend.get(`item/${id}.json`))
        )
      )
      .do((posts: Post[]) => this.model.set(posts))
      .mapTo(true);
  }
}

export interface Post {
  id: number;
  title: string;
  url: string;
  by: string;
  type: string;
  score: number;
  time: number;
  kids: number[];
  descendants: number;
}
