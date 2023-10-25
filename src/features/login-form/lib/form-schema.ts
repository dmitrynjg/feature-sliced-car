import * as z from 'zod';

export const formLoginSchema = z.object({
  login: z.string().min(1, {
    message: 'Логин или email не должен быть пустым и иметь хотя бы один символ',
  }),
  password: z.string().min(6, {
    message: 'Пароль должен быть хотя бы 6 символов',
  }),
});
