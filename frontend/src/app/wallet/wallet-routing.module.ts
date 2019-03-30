import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletPage } from './wallet.page';
import { RecipientsTab } from './recipients';
import { TransactionsTab } from './transactions';

const routes: Routes = [
  {
    path: '',
    component: WalletPage,
    children: [
      {
        path: 'recipients',
        component: RecipientsTab,
      },
      {
        path: 'transactions',
        component: TransactionsTab,
      },
      { path: '', redirectTo: 'recipients' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletRoutingModule {}
