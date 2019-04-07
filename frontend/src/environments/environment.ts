// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const DOMAIN = 'https://localhost:5001';

export const environment = {
  production: false,
  domain: DOMAIN,
  tokenKey: 'token',
  defaultRedirectUrl: '/wallet',
  features: {
    identity: {
      enabled: true,
      endpoint: `${DOMAIN}/connect/token`,
      clientId: 'investcircle.org',
      clientSecret: 'secret',
      scope: 'api.investcircle.org openid profile roles email offline_access',
    },
    wallet: {
      enabled: true,
    },
    help: {
      enabled: true,
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
