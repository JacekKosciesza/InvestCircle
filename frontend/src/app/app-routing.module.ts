import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppShellComponent } from './shared';

const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: 'wallet', loadChildren: './wallet/wallet.module#WalletModule' },
      { path: 'help', loadChildren: './help/help.module#HelpModule' },
      { path: '', redirectTo: '/wallet', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
