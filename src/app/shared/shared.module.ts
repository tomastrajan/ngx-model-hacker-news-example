import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatCardModule, MatButtonModule],
  declarations: [],
  exports: [CommonModule, MatToolbarModule, MatCardModule, MatButtonModule]
})
export class SharedModule {}
