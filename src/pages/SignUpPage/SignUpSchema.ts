import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바르지 않은 이메일 양식입니다.'),

  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, '영문과 숫자를 포함해야 합니다'),

  passwordCheck: z.string(),

  // 수정된 부분: boolean()으로 타입을 지정하고 refine으로 true인지 검사합니다.
  agree: z.boolean().refine(
    (val) => val === true, 
    {
      message: '개인정보 약관에 동의해야 합니다'
    }
  )
}).refine(
  data => data.password === data.passwordCheck,
  {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordCheck']
  }
);