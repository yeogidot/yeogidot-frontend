import { z } from 'zod';

export const ChangePasswordSchema = z.object({
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, '영문과 숫자를 포함해야 합니다'),

  new_password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, '영문과 숫자를 포함해야 합니다'),

  new_password_check: z.string(),

}).refine(
  data => data.new_password === data.new_password_check,
  {
    message: '비밀번호가 일치하지 않습니다',
    path: ['new_password_check']
  }
);