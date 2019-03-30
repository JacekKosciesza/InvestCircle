import { Component, Output, EventEmitter } from '@angular/core';
import { Wallet } from '../shared/wallet.model';

@Component({
  selector: 'wallet-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent {
  @Output() deposit = new EventEmitter<Wallet>();

  wallet = {
    name: 'Jacek',
    currency: 'XLM',
    balance: 100000,
  };

  onDepositButtonClick(wallet: Wallet): void {
    this.deposit.emit(wallet);
  }
}
