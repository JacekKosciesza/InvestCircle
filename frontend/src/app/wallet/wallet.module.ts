import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletPage } from './wallet.page';
import { BalanceComponent } from './balance';
import { DepositComponent } from './deposit';
import { RecipientsTab } from './recipients';
import { TransactionsTab } from './transactions';

@NgModule({
  imports: [WalletRoutingModule, CommonModule],
  declarations: [WalletPage, BalanceComponent, DepositComponent, RecipientsTab, TransactionsTab],
})
export class WalletModule {}
