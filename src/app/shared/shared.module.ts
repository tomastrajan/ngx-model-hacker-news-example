import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatCardModule],
  declarations: [],
  exports: [CommonModule, MatToolbarModule, MatCardModule]
})
export class SharedModule {}
