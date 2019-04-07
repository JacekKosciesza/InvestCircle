import { testJWT } from './jwt.model';

export interface Token {
  access_token: string;
  expires_in?: number;
  token_type?: string;
}

export const testToken: Token = { access_token: testJWT.toString() };
