import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HttpCachingInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // First, check the cache to see if this request exists.
    const cachedResponse = this.cache.get(req.urlWithParams);
    if (cachedResponse && !req.headers.get('disable-cache')) {
      return of(cachedResponse.clone());
    }

    return next.handle(req).pipe(
      tap(event => {
        if (
          event instanceof HttpResponse &&
          !req.headers.get('disable-cache')
        ) {
          this.cache.set(req.urlWithParams, event.clone());
        }
      })
    );
  }
}
