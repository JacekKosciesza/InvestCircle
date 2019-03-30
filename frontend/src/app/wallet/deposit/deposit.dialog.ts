import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Wallet } from '../shared/wallet.model';

@Component({
  selector: 'deposit-dialog',
  templateUrl: './deposit.dialog.html',
  styleUrls: ['./deposit.dialog.scss'],
})
export class DepositDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public wallet: Wallet) {}
}
