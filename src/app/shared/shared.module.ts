import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatCardModule, MatButtonModule],
  declarations: [],
  exports: [CommonModule, MatToolbarModule, MatCardModule, MatButtonModule]
})
export class SharedModule {}
