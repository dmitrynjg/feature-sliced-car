import * as z from 'zod';

export const formRegisterSchema = z
  .object({
    username: z.string().min(1, {
      message: 'Логин не должен быть пустым',
    }),
    email: z
      .string()
      .min(1, {
        message: 'Email не должен быть пустым',
      })
      .email({
        message: 'Неправильный формат email',
      }),
    password: z.string().min(6, {
      message: 'Пароль должен быть хотя бы 6 символов',
    }),
    passwordConfirm: z.string().min(1, {
      message: 'Пароль не должен быть пустым',
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Пароли не совпадают',
    path: ['passwordConfirm'], // path of error
  });
