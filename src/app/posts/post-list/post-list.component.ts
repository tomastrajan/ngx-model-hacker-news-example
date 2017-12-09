import { ActivatedRoute } from '@angular/router';
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChildren
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { listTransitions } from '@app/core';

import { Posts, PostsService } from '../posts.service';
import { PostComponent } from '@app/posts/post/post.component';

@Component({
  selector: 'nmhne-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  animations: [listTransitions]
})
export class PostListComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  posts: Posts;

  @ViewChildren(PostComponent) postComponents;

  @HostListener('window:keyup.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    event.preventDefault();
    this.unselectSelectedPostComponent();
  }

  @HostListener('window:keyup.arrowup', ['$event'])
  handleUpArrow(event: KeyboardEvent) {
    event.preventDefault();
    this.selectNextPostComponent(false);
  }

  @HostListener('window:keyup.arrowdown', ['$event'])
  handleDownArrow(event: KeyboardEvent) {
    event.preventDefault();
    this.selectNextPostComponent();
  }

  @HostListener('window:keyup.enter', ['$event'])
  handleEnter(event: KeyboardEvent) {
    event.preventDefault();
    this.openSelectedPostLink();
  }

  constructor(
    private route: ActivatedRoute,
    public postsService: PostsService
  ) {}

  get isSelected() {
    return this.postComponents
      ? this.postComponents.some(postComponent => postComponent.post.selected)
      : false;
  }

  ngOnInit() {
    this.postsService.init(this.route.routeConfig.path);
    this.postsService.posts$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(posts => (this.posts = posts));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onLoadMoreClick() {
    this.postsService.loadMorePosts();
  }

  onCloseSelectedCommentsClick() {
    this.unselectSelectedPostComponent();
  }

  private unselectSelectedPostComponent() {
    this.postComponents.some(postComponent => {
      if (postComponent.post.selected) {
        postComponent.unselect();
        return true;
      }
    });
  }

  private selectNextPostComponent(isNext = true) {
    const direction = isNext ? 1 : -1;
    const index = this.postComponents
      .toArray()
      .findIndex(postComponent => postComponent.post.selected);
    if (index === -1) {
      return;
    }
    const nextPostComponent = this.postComponents.toArray()[index + direction];
    if (nextPostComponent) {
      nextPostComponent.select();
    }
  }

  private openSelectedPostLink() {
    this.postComponents.some(postComponent => {
      if (postComponent.post.selected) {
        window.open(postComponent.post.url, '_blank');
        return true;
      }
    });
  }
}
