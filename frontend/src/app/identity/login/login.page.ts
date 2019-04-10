import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { LoginModel } from './shared';
import { IdentityService } from '../shared';
import { takeUntil, switchMap, tap } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

const SET_USER = gql`
  mutation SetUser($user: Object!) {
    setUser(user: $user) @client
  }
`;

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm: Observable<LoginModel>;
  error: Observable<any>;

  private unsubscribe: Subject<void> = new Subject();

  constructor(private identityService: IdentityService, private apollo: Apollo) {}

  ngOnInit(): void {
    this.loginForm = of({ email: '', password: '' });
  }

  onUpdate(from: LoginModel): void {}

  onLogin(form: LoginModel): void {
    this.identityService
      .login(form.email, form.password)
      .pipe(
        takeUntil(this.unsubscribe),
        tap(token => console.log(token)),
        switchMap(token => this.identityService.decodeToken(token)),
        tap(user => console.log(user)),
        switchMap(user =>
          this.apollo.mutate({
            mutation: SET_USER,
            variables: {
              user,
            },
          }),
        ),
        switchMap(_ => this.identityService.redirect()),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
