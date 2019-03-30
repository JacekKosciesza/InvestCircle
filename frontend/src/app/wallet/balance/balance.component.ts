import { Component } from '@angular/core';

@Component({
  selector: 'wallet-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent {
  wallet = {
    name: 'Jacek',
    currency: 'XLM',
    ballance: 100000,
  };
}