import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatCardModule } from '@angular/material';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';

import { IdentityRoutingModule } from './identity-routing.module';
import { LoginPage, LoginForm } from './login';
import { IdentityService } from './shared';

export function tokenGetter(): string {
  return sessionStorage.getItem(environment.tokenKey) || localStorage.getItem(environment.tokenKey);
}

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
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.domain],
      },
    }),
  ],
  declarations: [LoginPage, LoginForm],
  providers: [IdentityService],
})
export class IdentityModule {}
