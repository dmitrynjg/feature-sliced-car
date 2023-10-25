import { ListCheckboxWithSearch } from '@/shared';
import { useCarColorsQuery } from '@/entitites/car';
import React, { useEffect, useState } from 'react';

export interface FilterColorProps {
  getColors: (brands: string[]) => void;
}
export const FilterColor: React.FC<FilterColorProps> = ({ getColors }) => {
  const { data, isSuccess } = useCarColorsQuery();
  const [colors, setColors] = useState<{ name: string; text: string }[]>([]);
  
  useEffect(() => {
    if (data && isSuccess) {
      setColors(
        data.map((color: string) => {
          return { text: color, name: color };
        })
      );
    }
  }, [data, isSuccess]);
  
  return (
    <div className='px-3 py-2'>
      <h3 className='mb-2 px-4 text-lg font-semibold tracking-tight'>Цвет</h3>
      <div className='px-4 space-x-4 flex'>
        <ListCheckboxWithSearch
          list={colors}
          getCheckboxes={(checkboxes) =>
            getColors(checkboxes.filter((checkbox) => checkbox.isChecked).map((brand) => brand.text))
          }
          placeholder='Поиск цвета'
          isSearch
          isScroll
          scrollClassName='h-[150px]'
        />
      </div>
    </div>
  );
};
