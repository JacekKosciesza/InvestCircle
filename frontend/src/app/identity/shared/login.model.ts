export interface LoginFormModel {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const testLoginForm: LoginFormModel = {
  email: 'j.kosciesza@codeandpepper.com',
  password: 'P@ssw0rd',
  rememberMe: true,
};
