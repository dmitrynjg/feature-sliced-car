import { engineList } from '@/entitites/car';
import { ListCheckboxWithSearch } from '@/shared';
import React from 'react';

export interface FilterEngineProps {
  getEngines: (engines: string[]) => void;
}

export const FilterEngine: React.FC<FilterEngineProps> = ({ getEngines }) => {
  return (
    <div className='px-3 py-2'>
      <h3 className='mb-2 px-4 text-lg font-semibold tracking-tight'>Тип двигателя</h3>
      <div className='px-4 space-x-4'>
        <ListCheckboxWithSearch
          list={engineList}
          getCheckboxes={(checkboxes) => {
            getEngines(checkboxes.filter((checkbox) => checkbox.isChecked).map((brand) => brand.text))
          }}
        />
      </div>
    </div>
  );
};
