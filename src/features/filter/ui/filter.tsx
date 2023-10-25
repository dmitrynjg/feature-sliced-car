import { Button } from '@/shared';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FilterPrice } from './filter-price';
import { FilterName } from './filter-name';
import { FilterBrand } from './filter-brand';
import { FilterColor } from './filter-color';
import { FilterEngine } from './filter-engine';
import { FilterTransmission } from './filter-transmission';
import { FilterPowerReverse } from './filter-power-reverse';

interface FilterState {
  name: string;
  fromPrice: number | null;
  toPrice: number | null;
  brands: string[];
  colors: string[];
  engines: string[];
  transmissions: string[];
  powerReverse: number | null;
}

export interface FilterProps  {
  className?: string;
  onSubmit: (values: FilterState) => void;
}

export const Filter: React.FC<FilterProps> = ({ className, onSubmit }) => {
  const [filterData, setFilterData] = useState<FilterState>({
    name: '',
    fromPrice: null,
    toPrice: null,
    brands: [],
    colors: [],
    engines: [],
    transmissions: [],
    powerReverse: null,
  });
  return (
    <div className={cn('pb-12 mr-4', className)}>
      <div className='space-y-4 py-4'>
        <FilterName
          getName={(name) => {
            setFilterData({ ...filterData, name });
          }}
        />
        <FilterPrice
          getPrices={(prices) => {
            setFilterData({ ...filterData, fromPrice: prices.fromPrice, toPrice: prices.toPrice });
          }}
        />
        <FilterBrand
          getBrands={(brands) => {
            setFilterData({ ...filterData, brands });
          }}
        />
        <FilterColor
          getColors={(colors) => {
            setFilterData({ ...filterData, colors });
          }}
        />
        <FilterEngine
          getEngines={(engines) => {
            setFilterData({ ...filterData, engines });
          }}
        />
        <FilterTransmission
          getTransmissions={(transmissions) => {
            setFilterData({ ...filterData, transmissions });
          }}
        />
        <FilterPowerReverse
          getPowerReverse={(powerReverse) => {
            setFilterData({ ...filterData, powerReverse });
          }}
        />
        <div className='px-3 py-2'>
          <div className='px-4 space-x-4 flex'>
            <Button
              className='w-full'
              onClick={() => {
                onSubmit(filterData);
              }}
            >
              Найти
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
