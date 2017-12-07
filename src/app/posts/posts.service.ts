import { Injectable } from '@angular/core';
import { Model, ModelFactory } from 'ngx-model';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import { from } from 'rxjs/observable/from';
import { concatMap } from 'rxjs/operators/concatMap';
import { mergeMap } from 'rxjs/operators/mergeMap';

import { BackendService, TimeService } from '@app/core';

const RESOURCES = {
  top: 'topstories.json',
  new: 'newstories.json',
  show: 'showstories.json',
  job: 'jobstories.json',
  ask: 'askstories.json'
};

const PAGE_SIZE = 10;

@Injectable()
export class PostsService {
  private model: Model<Post[]>;
  posts$: Observable<Post[]>;
  ids: number[];
  index: number;

  constructor(
    private backend: BackendService,
    private time: TimeService,
    private modelFactory: ModelFactory<Post[]>
  ) {
    this.model = this.modelFactory.create([]);
    this.posts$ = this.model.data$;
  }

  init(resource: string) {
    this.model.set([]);
    this.getIds(resource)
      .pipe(
        tap((ids: number[]) => {
          this.ids = ids;
          this.index = PAGE_SIZE;
        }),
        mergeMap((ids: number[]) => this.getItems(ids.slice(0, PAGE_SIZE)))
      )
      .subscribe((post: Post) => this.addPost(post));
  }

  loadMorePosts() {
    const ids = this.ids.slice(this.index, this.index + PAGE_SIZE);
    this.index = this.index + PAGE_SIZE;
    this.getItems(ids).subscribe((post: Post) => this.addPost(post));
  }

  private addPost(post: Post) {
    post.domain = post.url
      .slice()
      .replace(/https?:\/\//, '')
      .replace(/www\./, '')
      .split('/')[0];
    post.timeSince = this.time.timeSince(post.time);
    this.model.set([...this.model.get(), post]);
  }

  private getIds(resource: string): Observable<number[]> {
    return <Observable<number[]>>this.backend.get(RESOURCES[resource]);
  }

  private getItems(ids: number[]): Observable<Post> {
    return from(ids).pipe(
      concatMap(id => <Observable<Post>>this.backend.get(`item/${id}.json`))
    );
  }
}

export interface Post {
  id: number;
  title: string;
  url: string;
  domain: string;
  by: string;
  type: string;
  score: number;
  time: number;
  timeSince: string;
  kids: number[];
  descendants: number;
}
