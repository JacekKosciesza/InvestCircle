import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Wallet } from './shared/wallet.model';
import { DepositDialog } from './deposit';

@Component({
  selector: 'wallet-page',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage {
  constructor(private dialog: MatDialog) {}

  onDeposit(wallet: Wallet) {
    this.dialog.open(DepositDialog, { data: wallet });
  }
}
