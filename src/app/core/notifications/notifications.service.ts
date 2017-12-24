import { Injectable } from '@angular/core';
import { Model, ModelFactory } from 'ngx-model';
import { Observable } from 'rxjs/Observable';
import { v4 as uuid } from 'uuid';

@Injectable()
export class NotificationsService {
  private model: Model<Notification[]>;
  notifications$: Observable<Notification[]>;

  constructor(private modelFactory: ModelFactory<Notification[]>) {
    this.model = this.modelFactory.create([]);
    this.notifications$ = this.model.data$;
  }

  addError(message: string, details?: string) {
    this.addNotification(NotificationType.ERROR, message, details);
  }

  addWarning(message: string, details?: string) {
    this.addNotification(NotificationType.WARNING, message, details);
  }

  addInfo(message: string, details?: string) {
    this.addNotification(NotificationType.INFO, message, details);
  }

  removeNotification(notification: Notification) {
    const data = this.model.get();
    data.splice(data.findIndex(item => item.id === notification.id), 1);
    this.model.set(data);
  }

  private addNotification(
    type: NotificationType,
    message: string,
    details?: string
  ) {
    this.model.set([
      ...this.model.get(),
      { id: uuid(), type, message, details }
    ]);
  }

  removeAllNotifications() {
    this.model.set([]);
  }
}

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  details?: string;
}

export enum NotificationType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}
