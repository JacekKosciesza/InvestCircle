import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatTooltipModule,
  MatToolbarModule,
  MatSlideToggleModule,
} from '@angular/material';

import { UserMenuComponent } from './user-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSlideToggleModule,
  ],
  exports: [UserMenuComponent],
  declarations: [UserMenuComponent],
})
export class UserMenuModule {}
