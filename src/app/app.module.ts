import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelpComponent } from './help/help.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [AppComponent, HelpComponent, NotificationsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  entryComponents: [HelpComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
