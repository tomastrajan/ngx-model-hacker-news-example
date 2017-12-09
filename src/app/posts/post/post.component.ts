import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit
} from '@angular/core';
import { DOWN_ARROW, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';

import { listTransitions } from '@app/core';

import { Post, PostsService } from '../posts.service';

const HIDE_ANIMATION_DURATION = 250;

@Component({
  selector: 'nmhne-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [listTransitions]
})
export class PostComponent implements OnInit {
  @Input() index: number;
  @Input() selected: boolean;
  @Input() post: Post;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.selected && event.keyCode === ESCAPE) {
      this.executeAfterUnselectingPreviousPost();
    }
    if (this.selected && event.keyCode === DOWN_ARROW) {
      event.stopImmediatePropagation();
      event.stopImmediatePropagation();
      this.executeAfterUnselectingPreviousPost(
        this.postsService.selectNextPost.bind(this.postsService, this.post)
      );
    }
    if (this.selected && event.keyCode === UP_ARROW) {
      event.stopImmediatePropagation();
      this.executeAfterUnselectingPreviousPost(
        this.postsService.selectNextPost.bind(
          this.postsService,
          this.post,
          false
        )
      );
    }
  }

  constructor(private postsService: PostsService, private el: ElementRef) {}

  ngOnInit() {}

  onCommentsClick() {
    this.executeAfterUnselectingPreviousPost(
      this.postsService.selectPost.bind(this.postsService, this.post)
    );
  }

  onActiveCommentsClick() {
    this.executeAfterUnselectingPreviousPost();
  }

  executeAfterUnselectingPreviousPost(callback?: any) {
    this.postsService.unselectPost();
    setTimeout(() => {
      const { top } = this.el.nativeElement.getBoundingClientRect();
      if (top < 70 || top > window.innerHeight) {
        this.el.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
      if (callback) {
        callback();
      }
    }, HIDE_ANIMATION_DURATION);
  }
}
