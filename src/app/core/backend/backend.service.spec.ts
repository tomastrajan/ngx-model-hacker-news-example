import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { BackendService } from './backend.service';

describe('BackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BackendService]
    });
  });

  it(
    'should be created',
    inject([BackendService], (service: BackendService) => {
      expect(service).toBeTruthy();
    })
  );
});
