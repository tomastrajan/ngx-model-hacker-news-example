import { TestBed, inject } from '@angular/core/testing';
import { NgxModelModule } from 'ngx-model';

import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxModelModule],
      providers: [NotificationsService]
    });
  });

  it(
    'should be created',
    inject([NotificationsService], (service: NotificationsService) => {
      expect(service).toBeTruthy();
    })
  );
});
