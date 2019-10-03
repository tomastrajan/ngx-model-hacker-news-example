import { TestBed, inject } from '@angular/core/testing';

import { CoreModule } from '@app/core';

import { PostsService } from './posts.service';

describe('PostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [PostsService]
    });
  });

  it('should be created', inject([PostsService], (service: PostsService) => {
    expect(service).toBeTruthy();
  }));
});
