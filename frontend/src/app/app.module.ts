import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { CoreModule } from './core/core.module';
import { AppShellModule } from './shared/app-shell/app-shell.module';
import { IdentityModule } from './identity/identity.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    MatProgressBarModule,
    CoreModule,
    AppShellModule,
    IdentityModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
