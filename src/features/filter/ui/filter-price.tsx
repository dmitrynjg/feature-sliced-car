import { Input } from '@/shared';
import React, { useEffect, useState } from 'react';

interface FilterPriceState {
  fromPrice: number;
  toPrice: number;
}

export interface FilterPriceProps {
  getPrices: (prices: FilterPriceState) => void;
}

export const FilterPrice: React.FC<FilterPriceProps> = ({ getPrices }) => {
  const [prices, setPrices] = useState<FilterPriceState>({ fromPrice: 1, toPrice: 1 });

  return (
    <div className='px-3 py-2'>
      <h3 className='mb-2 px-4 text-lg font-semibold tracking-tight'>Цена</h3>
      <div className='px-4 space-x-4 flex'>
        <Input
          placeholder='цена от'
          type='number'
          onChange={(e) => {
            const newState = { toPrice: prices.toPrice, fromPrice: Number(e.target.value) };
            setPrices(newState);
            getPrices(newState);
          }}
          min='1'
        />
        <Input
          placeholder='цена до'
          type='number'
          onChange={(e) => {
            const newState = { fromPrice: prices.fromPrice, toPrice: Number(e.target.value) };
            setPrices(newState);
            getPrices(newState);
          }}
          min={prices.fromPrice}
        />
      </div>
    </div>
  );
};
