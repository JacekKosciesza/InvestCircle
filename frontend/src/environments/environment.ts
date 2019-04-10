// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const IDENTITY_URL = 'https://localhost:5001';
const GATEWAY_URL = 'https://localhost:6001/graphql';

export const environment = {
  production: false,
  domain: IDENTITY_URL,
  tokenKey: 'token',
  defaultRedirectUrl: '/wallet',
  features: {
    gateway: {
      endpoint: GATEWAY_URL,
    },
    identity: {
      whitelistedDomains: [IDENTITY_URL, GATEWAY_URL],
      enabled: true,
      endpoint: `${IDENTITY_URL}/connect/token`,
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
