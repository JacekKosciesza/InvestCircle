import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { Wallet } from '../shared/wallet.model';

@Component({
  selector: 'wallet-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent {
  @Input() wallets: Wallet[];
  @Output() deposit = new EventEmitter<Wallet>();

  onDepositButtonClick(wallet: Wallet): void {
    this.deposit.emit(wallet);
  }
}
