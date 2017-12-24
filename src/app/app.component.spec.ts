import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { AppComponent } from './app.component';
import { NotificationsComponent } from './notifications/notifications.component';

describe('AppComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, SharedModule, CoreModule],
        declarations: [AppComponent, NotificationsComponent]
      }).compileComponents();
    })
  );

  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );
});
