export interface SignUpInput {
  email: string;
  password: string;
  password_check: string;
  privacy_policy_agreed: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface Token {
  token_type: string;
  access_token: string;
}
