import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  Navbar,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared';
import Link from 'next/link';

import { PlusCircleIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { User } from '@/entitites/user';
import { LogoutButton } from '@/features/logout-button';

export const AppNavbar: React.FC = () => {
  const user: User = useSelector((state: RootState) => state.user.user);
  const ContentNavbar = () =>
    !user.id ? (
      <>
        <Link
          href='/auth?type=login'
          className='mr-2'
        >
          <Button variant='outline'>Войти</Button>
        </Link>
        <Link href='/auth?type=register'>
          <Button>Зарегистрироваться</Button>
        </Link>
      </>
    ) : (
      <>
        <Link
          className='mr-2'
          href='/car/create'
        >
          <Button>
            <PlusCircleIcon className='mr-2 h-4 w-4' />
            Добавить автомобиль
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Аккаунт</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );

  return (
    <Navbar>
      <ContentNavbar />
    </Navbar>
  );
};
