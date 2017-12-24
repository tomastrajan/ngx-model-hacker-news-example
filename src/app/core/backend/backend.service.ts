import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Model, ModelFactory } from 'ngx-model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { finalize } from 'rxjs/operators/finalize';
import { delay } from 'rxjs/operators/delay';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
import { catchError } from 'rxjs/operators/catchError';

import { environment } from '@env/environment';

import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class BackendService {
  private model: Model<Requests>;
  isLoading$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private modelFactory: ModelFactory<Requests>,
    private notificationsService: NotificationsService
  ) {
    this.model = this.modelFactory.create({ count: 0 });
    this.isLoading$ = this.model.data$.pipe(
      map(requests => requests.count > 0),
      delay(300)
    );
  }

  get(url: string) {
    this.incrementRequests();
    return this.http.get(`${environment.api.url}${url}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationsService.addWarning('Request failed', error.message);
        return of(undefined);
      }),
      filter(Boolean),
      finalize(() => this.decrementRequests())
    );
  }

  private incrementRequests() {
    this.model.set({ count: this.model.get().count + 1 });
  }

  private decrementRequests() {
    this.model.set({ count: this.model.get().count - 1 });
  }
}

export interface Requests {
  count: number;
}
