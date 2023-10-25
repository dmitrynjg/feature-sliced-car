import Link from 'next/link';
import React, { ReactNode } from 'react';
import { Logo } from '../logo/logo';

export interface NavbarProps {
  className?: string;
  children?: ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ className, children }) => {
  return (
    <div className={`bg-white border-gray-200 ${className}`}>
      <div className='max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link href='/'>
          <Logo className='text-2xl' />
        </Link>
        <div className='flex items-center'>{children}</div>
      </div>
    </div>
  );
};
