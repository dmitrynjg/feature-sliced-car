import { LoginForm } from '@/features/login-form';
import { RegisterForm } from '@/features/register-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { User } from '@/entitites/user';
import Link from 'next/link';

export interface AuthProps {
  className?: string;
  formName?: string;
}

export const Auth: React.FC<AuthProps> = ({ className, formName }) => {
  const [tabValue, setTabValue] = useState<string>('register');

  useEffect(() => {
    setTabValue(typeof formName === 'string' ? formName : 'register');
  }, [formName]);
  const user: User = useSelector((state: RootState) => state.user.user);

  if (user && user.id) {
    return (
      <div>
        <div className='text-xl font-medium'>Вы уже авторизованы</div>
        <Link href="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">На главную</Link>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <Tabs
        value={tabValue}
        onValueChange={setTabValue}
        defaultValue={'register'}
        className='w-full'
      >
        <TabsList className='w-full'>
          <TabsTrigger value='login'>Авторизация</TabsTrigger>
          <TabsTrigger value='register'>Регистрация</TabsTrigger>
        </TabsList>
        <TabsContent value='register'>
          <RegisterForm />
        </TabsContent>
        <TabsContent value='login'>
          <LoginForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};
