import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoggerService } from '../../core/logger';
import { environment } from 'src/environments/environment';

const GET_USER = gql`
  {
    user @client {
      name
      email
      photo
    }
  }
`;

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent implements OnInit, OnDestroy {
  collapsed$: Observable<boolean> = of(true);
  user$: Observable<string>;
  public env = environment;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private apollo: Apollo, private logger: LoggerService) {}

  ngOnInit(): void {
    this.logger.log('AppComponent');
    this.user$ = this.apollo
      .watchQuery<any>({
        query: GET_USER,
      })
      .valueChanges.pipe(map(result => result.data && result.data.user));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
