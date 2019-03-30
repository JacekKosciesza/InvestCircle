import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatTabsModule, MatTableModule, MatDialogModule } from '@angular/material';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletPage } from './wallet.page';
import { BalanceComponent } from './balance';
import { DepositDialog } from './deposit';
import { RecipientsTab } from './recipients';
import { TransactionsTab } from './transactions';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    WalletRoutingModule,
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
  ],
  declarations: [WalletPage, BalanceComponent, DepositDialog, RecipientsTab, TransactionsTab],
  entryComponents: [DepositDialog],
})
export class WalletModule {}
