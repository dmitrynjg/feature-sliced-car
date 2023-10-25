import { setJwt, setUser, useLoginMutation } from '@/entitites/user';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  toast,
} from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { formLoginSchema } from '../lib/form-schema';
import { useDispatch } from 'react-redux';

export interface LoginFormProps {
  className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const [login, result] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (result && result.data && result.data.jwt) {
      dispatch(setJwt(result.data.jwt));
      dispatch(setUser(result.data.user));
    }
  }, [result, dispatch]);

  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formLoginSchema>) => {
    try {
      await login({
        identifier: values.login,
        password: values.password,
      }).unwrap();
    } catch (error) {
      toast({
        title: 'Авторзация',
        description: 'Не удалось авторизоваться',
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
            name='login'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Логин</FormLabel>
                <FormControl>
                  <Input
                    placeholder='example@email.com'
                    {...field}
                  />
                </FormControl>
                <FormDescription>Введите логин или email</FormDescription>
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
          <Button
            type='submit'
            className='w-full'
          >
            Войти
          </Button>
        </form>
      </Form>
    </div>
  );
};
