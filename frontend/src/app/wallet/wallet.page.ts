import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Wallet } from './shared/wallet.model';
import { DepositDialog } from './deposit';

const ListOfWallets = gql`
  query ListOfWallets {
    wallets {
      id
      name
      balance
    }
  }
`;

@Component({
  selector: 'wallet-page',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit, OnDestroy {
  wallets$: Observable<Wallet[]>;

  private unsubscribe: Subject<void> = new Subject();

  constructor(private apollo: Apollo, private dialog: MatDialog) {}

  ngOnInit() {
    this.wallets$ = this.apollo
      .watchQuery<any>({
        query: ListOfWallets,
      })
      .valueChanges.pipe(map(result => result.data.wallets));
  }

  onDeposit(wallet: Wallet) {
    this.dialog.open(DepositDialog, { data: wallet });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
