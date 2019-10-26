import { Injectable } from '@angular/core';
import { Model, ModelFactory } from 'ngx-model';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { tap } from 'rxjs/internal/operators/tap';
import { from } from 'rxjs/internal/observable/from';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { delay } from 'rxjs/internal/operators/delay';

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
      .subscribe((post: Item) => this.addPost(post));
  }

  loadMorePosts() {
    const data = this.model.get();
    const ids = data.ids.slice(data.index, data.index + PAGE_SIZE);
    data.index += PAGE_SIZE;
    this.model.set(data);
    this.getItems(ids)
      .pipe(takeUntil(this.resourceChange$))
      .subscribe((post: Item) => this.addPost(post));
  }

  selectPost(post: Item) {
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

  trackByItemId(index: number, item: Item) {
    return item.id;
  }

  getDescendantCount(comment: Item) {
    let count = 0;
    function countRecursive(comments: Item[]) {
      if (!comments || !comments.length) {
        return;
      }
      count += comments.length;
      comments.forEach(item => countRecursive(item.comments));
    }
    countRecursive(comment.comments);
    return count;
  }

  private addPost(post: Item) {
    post.domain = (post.url || '')
      .slice()
      .replace(/https?:\/\//, '')
      .replace(/www\./, '')
      .split('/')[0];
    post.timeSince = this.time.timeSince(post.time);
    const data = this.model.get();
    data.items.push(post);
    data.items.sort((a, b) => {
      const aId = data.ids.findIndex(id => id === a.id);
      const bId = data.ids.findIndex(id => id === b.id);
      return aId - bId;
    });
    this.model.set(data);
  }

  private getIds(resource: string): Observable<number[]> {
    return <Observable<number[]>>this.backend.get(RESOURCES[resource]);
  }

  private getItems(ids: number[]): Observable<Item> {
    return from(ids).pipe(
      mergeMap(id => <Observable<Item>>this.backend.get(`item/${id}.json`))
    );
  }

  private loadComments(source: Item) {
    if (!source.kids || !source.kids.length) {
      return;
    }
    this.getItems(source.kids)
      .pipe(
        takeUntil(this.selectedPostChange$),
        delay(10)
      )
      .subscribe((comment: Item) => {
        const data = this.model.get();
        const parentPostOrComment = this.findParent(data.items, comment.parent);
        if (!parentPostOrComment.comments) {
          parentPostOrComment.comments = [];
        }
        if (
          !comment.deleted &&
          !parentPostOrComment.comments.some(c => c.id === comment.id)
        ) {
          comment.timeSince = this.time.timeSince(comment.time);
          comment.text = this.formatCommentQuotedText(comment.text);
          parentPostOrComment.comments.push(comment);
        }
        this.model.set(data);
        if (comment.kids) {
          this.loadComments(comment);
        }
      });
  }

  private findParent(items: Item[], itemId: number) {
    let result = null;
    function findRecursive(source: Item[]) {
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

  private formatCommentQuotedText(text: string) {
    return text
      .split(/<p>/)
      .map(token =>
        token.indexOf('&gt;') === 0
          ? (token = `<blockquote>${token.replace('&gt;', '')}</blockquote>`)
          : token
      )
      .join('<p>');
  }
}

export interface Posts {
  ids?: number[];
  index?: number;
  isSelected?: boolean;
  items: Item[];
}

export interface Item {
  id: number;
  by: string;
  score: number;
  time: number;
  timeSince: string;
  kids: number[];
  descendants?: number;
  comments?: Item[];
  selected?: boolean;
  visited?: boolean;
  title?: string;
  url?: string;
  domain?: string;
  type?: string;
  parent?: number;
  text?: string;
  deleted?: boolean;
}
