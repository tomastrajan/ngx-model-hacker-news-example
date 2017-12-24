import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { NotificationsService, Notification } from '@app/core';

@Component({
  selector: 'nmhne-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  notifications: Notification[];

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit() {
    this.notificationsService.notifications$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(notifications => (this.notifications = notifications));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onCloseClick(notification: Notification) {
    this.notificationsService.removeNotification(notification);
  }

  onCloseAllClick() {
    this.notificationsService.removeAllNotifications();
  }
}
