import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Token } from './token.model';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(private http: HttpClient, private router: Router, private jwt: JwtHelperService) {}

  getStoredToken(): Observable<Token> {
    const token = sessionStorage.getItem(environment.tokenKey) || localStorage.getItem(environment.tokenKey);
    return of(token ? { access_token: token } : null);
  }

  login(email: string, password: string): Observable<Token> {
    // tslint:disable-next-line:max-line-length
    const body = `grant_type=password&username=${email}&password=${password}&scope=${
      environment.features.identity.scope
    }&client_id=${environment.features.identity.clientId}&client_secret=${environment.features.identity.clientSecret}`;
    return this.http
      .post(environment.features.identity.endpoint, body, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      })
      .pipe(
        map(response => ((response as any).data ? (response as any).data : response)),
        catchError((httpErrorResponse: HttpErrorResponse) => {
          const response = this.createLoginErrorResponse(httpErrorResponse);
          return throwError(response);
        }),
      );
  }

  logout(): Observable<boolean> {
    sessionStorage.removeItem(environment.tokenKey);
    localStorage.removeItem(environment.tokenKey);

    return of(true);
  }

  decodeToken(token: Token): Observable<User> {
    const decodedToken = this.jwt.decodeToken(token.access_token);
    const user = {
      id: decodedToken.sub,
      email: decodedToken.email,
      name: `${decodedToken.given_name} ${decodedToken.family_name}`,
      photo: decodedToken.picture,
      admin: decodedToken.role === 'Admin',
    };

    return of(user);
  }

  redirect(url?: string): Observable<boolean> {
    const redirect =
      url || this.router.routerState.snapshot.root.queryParams['redirect'] || environment.defaultRedirectUrl;
    return from(this.router.navigate([redirect]));
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem(environment.tokenKey) || localStorage.getItem(environment.tokenKey);
    if (!token) {
      return false;
    }
    try {
      const isTokenExpired = this.jwt.isTokenExpired(token);
      if (isTokenExpired) {
        console.log(`Token expired ${this.jwt.getTokenExpirationDate(token)}`);
      }
      return !isTokenExpired;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  private createLoginErrorResponse(httpErrorResponse: HttpErrorResponse): any {
    let message: string;
    let fieldDetails: InvalidField[];

    const identityServerErrorResponse = this.getIdentityServerError(httpErrorResponse);
    message = null;
    fieldDetails = [];

    if (identityServerErrorResponse && identityServerErrorResponse.error === 'invalid_grant') {
      if (identityServerErrorResponse.error_description) {
        if (identityServerErrorResponse.error_description === 'invalid_username_or_password') {
          message = 'Niepoprawne hasło lub email';
        } else if (
          identityServerErrorResponse.error_description === 'user_not_active' &&
          identityServerErrorResponse.InactivityStatus
        ) {
          switch (identityServerErrorResponse.InactivityStatus) {
            case 'Locked':
              message = 'Użytkownik jest zablokowany';
              break;

            case 'UserRegistrationRequestedEmailNotVerified':
              message = 'Email nie jest zweryfikowany';
              break;
          }
        }
      }
    }

    if (!message) {
      message = 'Błąd po stronie serwera';
    }

    const error: InvalidParamsResponse = {
      message: message,
      details: fieldDetails,
    };

    return {
      status: httpErrorResponse.status,
      error: error,
    };
  }

  private getIdentityServerError(httpErrorResponse: HttpErrorResponse): any {
    if (httpErrorResponse.status === 400) {
      // BAD_REQUEST
      return httpErrorResponse.error;
    }
    return null;
  }
}

export interface InvalidParamsResponse {
  message: string;
  details: Array<InvalidField>;
}

export interface InvalidField {
  fieldName: string;
  message: string;
}
