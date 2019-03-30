import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'identity', loadChildren: './identity/identity.module#IdentityModule' },
  { path: 'wallet', loadChildren: './wallet/wallet.module#WalletModule' },
  { path: '', redirectTo: '/wallet', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
