import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { formRegisterSchema } from '../lib/form-schema';
import { setJwt, setUser, useRegisterMutation } from '@/entitites/user';
import { useDispatch } from 'react-redux';

export interface RegisterFormProps {
  className?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ className }) => {
  const [register, result] = useRegisterMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (result && result.data && result.data.jwt) {
      dispatch(setJwt(result.data.jwt));
      dispatch(setUser(result.data.user));
    }
  }, [result, dispatch]);

  const form = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formRegisterSchema>) => {
    try {
      await register({
        username: values.username,
        password: values.password,
        email: values.email,
      }).unwrap();
    } catch (error) {
      toast({
        title: 'Регистрация',
        description: 'Не удалось зарегистрироваться',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className={`${className}`}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Логин</FormLabel>
                <FormControl>
                  <Input
                    placeholder='user'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='example@email.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Пароль'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormDescription>Пароль от 6 символов</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='passwordConfirm'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Подтвердите пароль</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Пароль'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-full'
          >
            Зарегистрироваться
          </Button>
        </form>
      </Form>
    </div>
  );
};
