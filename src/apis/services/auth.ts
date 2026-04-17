import { http } from '../http';
import type {
  SignUpInput,
  LoginInput,
  Token,
  ChangePasswordInput,
} from 'src/types/auth.type';

export const authService = {
  signUp: (input: SignUpInput) => {
    return http.post<string>('/api/auth/signup', input);
  },
  login: (input: LoginInput) => {
    return http.post<Token>('/api/auth/login', input);
  },
  logout: () => {
    return http.post<string>('/api/auth/login', undefined);
  },
  deleteAccount: (password: string, token: string) => {
    return http.delete<{
      message: string;
      error?: string;
      status?: number;
    }>('/api/auth/account', token, { password });
  },
  changePassword: (input: ChangePasswordInput, token: string) => {
    return http.patch<{
      message: string;
      error?: string;
      status?: number;
    }>('/api/auth/password', input, token);
  },
};
