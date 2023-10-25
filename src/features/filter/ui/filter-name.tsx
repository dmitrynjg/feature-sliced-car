import { Input } from '@/shared';
import React from 'react';

export interface FilterNameProps {
  getName: (name: string) => void;
}

export const FilterName: React.FC<FilterNameProps> = ({ getName }) => {
  return (
    <div className='px-3 py-2'>
      <h3 className='mb-2 px-4 text-lg font-semibold tracking-tight'>Название</h3>
      <div className='px-4 space-x-4 flex'>
        <Input
          placeholder='Название'
          type='text'
          onChange={(e) => getName(e.target.value)}
        />
      </div>
    </div>
  );
};
