import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatCardModule } from '@angular/material';

import { IdentityRoutingModule } from './identity-routing.module';
import { LoginPage, LoginForm } from './login';

@NgModule({
  imports: [
    IdentityRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
  ],
  declarations: [LoginPage, LoginForm],
})
export class IdentityModule {}
