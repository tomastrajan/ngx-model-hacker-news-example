import { Injectable } from '@angular/core';
import { Model, ModelFactory } from 'ngx-model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators/tap';
import { from } from 'rxjs/observable/from';
import { concatMap } from 'rxjs/operators/concatMap';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { BackendService, TimeService } from '@app/core';

const RESOURCES = {
  top: 'topstories.json',
  new: 'newstories.json',
  show: 'showstories.json',
  job: 'jobstories.json',
  ask: 'askstories.json'
};

const PAGE_SIZE = 20;

@Injectable()
export class PostsService {
  private resourceChange$: Subject<void> = new Subject<void>();
  private selectedPostChange$: Subject<void> = new Subject<void>();
  private model: Model<Posts>;
  posts$: Observable<Posts>;

  constructor(
    private backend: BackendService,
    private time: TimeService,
    private modelFactory: ModelFactory<Posts>
  ) {
    this.model = this.modelFactory.create({ items: [] });
    this.posts$ = this.model.data$;
  }

  init(resource: string) {
    this.resourceChange$.next();
    this.model.set({
      items: []
    });
    this.getIds(resource)
      .pipe(
        tap((ids: number[]) => {
          this.model.set({
            ids,
            index: PAGE_SIZE,
            items: []
          });
        }),
        mergeMap((ids: number[]) => this.getItems(ids.slice(0, PAGE_SIZE))),
        takeUntil(this.resourceChange$)
      )
      .subscribe((post: Post) => this.addPost(post));
  }

  loadMorePosts() {
    const data = this.model.get();
    const ids = data.ids.slice(data.index, data.index + PAGE_SIZE);
    data.index += PAGE_SIZE;
    this.model.set(data);
    this.getItems(ids)
      .pipe(takeUntil(this.resourceChange$))
      .subscribe((post: Post) => this.addPost(post));
  }

  selectPost(post: Post) {
    const data = this.model.get();
    const foundPost = data.items.find(item => item.id === post.id);
    foundPost.selected = true;
    data.isSelected = true;
    this.model.set(data);
    this.selectedPostChange$.next();
    this.loadComments(post);
  }

  unselectPost() {
    const data = this.model.get();
    const foundPost = data.items.find(item => item.selected);
    if (foundPost) {
      data.isSelected = false;
      foundPost.selected = false;
      foundPost.visited = true;
      this.model.set(data);
    }
  }

  trackByItemId(index: number, item: Post | Comment) {
    return item.id;
  }

  getDescendantCount(comment: Comment) {
    let count = 0;
    function countRecursive(comments: Comment[]) {
      if (!comments || !comments.length) {
        return;
      }
      count += comments.length;
      comments.forEach(item => countRecursive(item.comments));
    }
    countRecursive(comment.comments);
    return count;
  }

  private addPost(post: Post) {
    post.domain = (post.url || '')
      .slice()
      .replace(/https?:\/\//, '')
      .replace(/www\./, '')
      .split('/')[0];
    post.timeSince = this.time.timeSince(post.time);
    const data = this.model.get();
    data.items.push(post);
    this.model.set(data);
  }

  private getIds(resource: string): Observable<number[]> {
    return <Observable<number[]>>this.backend.get(RESOURCES[resource]);
  }

  private getItems(ids: number[]): Observable<Post> {
    return from(ids).pipe(
      concatMap(id => <Observable<Post>>this.backend.get(`item/${id}.json`))
    );
  }

  private loadComments(source: Post | Comment) {
    if (!source.kids || !source.kids.length) {
      return;
    }
    this.getItems(source.kids)
      .pipe(takeUntil(this.selectedPostChange$))
      .subscribe((comment: any) => {
        const data = this.model.get();
        const item = this.findParent(data.items, comment.parent);
        if (!item.comments) {
          item.comments = [];
        }
        if (!comment.deleted && !item.comments.some(c => c.id === comment.id)) {
          comment.timeSince = this.time.timeSince(comment.time);
          item.comments.push(comment);
        }
        this.model.set(data);
        if (comment.kids) {
          this.loadComments(comment);
        }
      });
  }

  private findParent(items: Post[] | Comment[], itemId: number) {
    let result = null;
    function findRecursive(source: Post[] | Comment[]) {
      for (let i = 0; i < source.length; i++) {
        if (source[i].id === itemId) {
          result = source[i];
          break;
        }
        if (source[i].comments && source[i].comments.length) {
          findRecursive(source[i].comments);
        }
      }
    }
    findRecursive(items);
    return result;
  }
}

export interface Posts {
  ids?: number[];
  index?: number;
  isSelected?: boolean;
  items: Post[];
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
  comments?: Comment[];
  selected?: boolean;
  visited?: boolean;
}

export interface Comment {
  id: number;
  parent: number;
  kids: number[];
  text: string;
  score: number;
  by: string;
  deleted: boolean;
  time: number;
  timeSince: string;
  comments?: Comment[];
}
