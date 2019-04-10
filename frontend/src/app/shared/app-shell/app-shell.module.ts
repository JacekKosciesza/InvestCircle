import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDividerModule,
  MatTooltipModule,
  MatButtonModule,
} from '@angular/material';

import { AppShellComponent } from './app-shell.component';
import { SharedModule } from '../shared.module';
import { UserMenuModule } from 'src/app/identity/user';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatButtonModule,
    SharedModule,
    UserMenuModule,
  ],
  exports: [AppShellComponent],
  declarations: [AppShellComponent],
})
export class AppShellModule {}
