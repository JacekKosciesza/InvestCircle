import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { LoginModel } from './shared';
import { IdentityService } from '../shared';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm: Observable<LoginModel>;
  error: Observable<any>;

  private unsubscribe: Subject<void> = new Subject();

  constructor(private identityService: IdentityService) {}

  ngOnInit(): void {
    this.loginForm = of({ email: '', password: '' });
  }

  onUpdate(from: LoginModel): void {}

  onLogin(form: LoginModel): void {
    debugger;
    this.identityService
      .login(form.email, form.password)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(token => {
        console.log(token);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
