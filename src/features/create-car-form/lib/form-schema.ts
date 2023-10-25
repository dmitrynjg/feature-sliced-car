import * as z from 'zod';

export const formCreateCarSchema = z
  .object({
    name: z.string().min(1, {
      message: 'Название не должно быть пустым',
    }),
    color: z.string().min(1, {
      message: 'Цвет не должен быть пустым',
    }),
    brand: z.string().min(1, {
      message: 'Бренд не должен быть пустым',
    }),
    model: z.string().min(1, {
      message: 'Модель не должна быть пустым',
    }),
    engine: z.string().min(1, {
      message: 'Тип движка не должен быть пустым',
    }),
    price: z
      .string({
        required_error: 'Вы не указали цену',
      })
      .refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, {
        message: 'Цена должна быть числом и больше 0',
      }),
    yearIssue: z
      .string({
        required_error: 'Вы не указали год выпуска',
      })
      .refine(
        (val) =>
          !Number.isNaN(Number(val)) &&
          Number.isInteger(Number(val)) &&
          Number(val) >= 1900 &&
          Number(val) <= new Date().getFullYear(),
        {
          message: 'Год выпуска должен быть целым числом, больше или равен 1900 и меньше или равен текущему году',
        }
      ),
  })
  .and(
    z
      .object({
        powerReserve: z.coerce.number().min(1, {
          message: 'Запас хода не может быть равен нулю',
        }),
      })
      .or(
        z.object({
          transmission: z.string().min(1, {
            message: 'Тип трансмиссии не должен быть пустым',
          }),
        })
      )
  );
