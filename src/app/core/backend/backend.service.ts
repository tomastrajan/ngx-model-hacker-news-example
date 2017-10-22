import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable()
export class BackendService {
  constructor(private http: HttpClient) {}

  get(url: string) {
    return this.http.get(`${environment.api.url}${url}`);
  }
}
