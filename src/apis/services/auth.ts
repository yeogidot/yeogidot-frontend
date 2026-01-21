import { http } from '../http';
import type { SignUpInput, LoginInput, Token } from 'src/types/auth';

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
};
