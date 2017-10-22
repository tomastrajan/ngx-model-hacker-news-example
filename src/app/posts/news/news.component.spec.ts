import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { NewsComponent } from './news.component';
import { PostComponent } from '../post/post.component';
import { PostsService } from '../posts.service';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [CoreModule, SharedModule],
        providers: [PostsService],
        declarations: [NewsComponent, PostComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
