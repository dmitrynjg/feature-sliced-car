import { ListCheckboxWithSearch } from '@/shared';
import React, { useEffect, useState } from 'react';
import { useCarBrandsQuery } from '@/entitites/car';

export interface FilterBrandProps {
  getBrands: (brands: string[]) => void;
}

export const FilterBrand: React.FC<FilterBrandProps> = ({ getBrands }) => {
  const { data, isSuccess } = useCarBrandsQuery();
  const [brands, setBrands] = useState<{ name: string; text: string }[]>([]);
  useEffect(() => {
    if (data && isSuccess) {
      setBrands(
        data.map((color: string) => {
          return { text: color, name: color };
        })
      );
    }
  }, [data, isSuccess]);

  return (
    <div className='px-3 py-2'>
      <h3 className='mb-2 px-4 text-lg font-semibold tracking-tight'>Бренд</h3>
      <div className='px-4 space-x-4 flex'>
        <ListCheckboxWithSearch
          list={brands}
          placeholder='Поиск бренда'
          isSearch
          isScroll
          scrollClassName='h-[150px]'
          getCheckboxes={(checkboxes) =>
            getBrands(checkboxes.filter((checkbox) => checkbox.isChecked).map((brand) => brand.text))
          }
        />
      </div>
    </div>
  );
};
