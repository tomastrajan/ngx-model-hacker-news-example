import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BackendService } from './backend/backend.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [BackendService]
})
export class CoreModule {}
