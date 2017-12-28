import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxModelModule } from 'ngx-model';

import { BackendService } from './backend/backend.service';
import { HttpCachingInterceptor } from './backend/http-caching.interceptor';
import { TimeService } from './util/time.service';
import { ScrollService } from './util/scroll.service';
import { NotificationsService } from './notifications/notifications.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, NgxModelModule],
  declarations: [],
  providers: [
    BackendService,
    NotificationsService,
    TimeService,
    ScrollService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCachingInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
