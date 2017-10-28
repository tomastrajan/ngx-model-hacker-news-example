import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { ModelFactory, Model } from 'ngx-model';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { tap } from 'rxjs/operators/tap';
import { mapTo } from 'rxjs/operators/mapTo';
import { mergeMap } from 'rxjs/operators/mergeMap';

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
      .pipe(
        mergeMap((ids: any) =>
          forkJoin(
            ids
              .filter((id, index) => index < 10)
              .map(id => this.backend.get(`item/${id}.json`))
          )
        ),
        tap((posts: Post[]) => this.model.set(posts)),
        mapTo(true)
      );
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
