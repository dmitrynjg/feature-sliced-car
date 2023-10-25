import { transmissionList } from '@/entitites/car';
import { ListCheckboxWithSearch } from '@/shared';

export interface FilterTransmissionProps {
  getTransmissions: (engines: string[]) => void;
}

export const FilterTransmission: React.FC<FilterTransmissionProps> = ({ getTransmissions }) => {
  return (
    <div className='px-3 py-2'>
      <h3 className='mb-2 px-4 text-lg font-semibold tracking-tight'>Трансмиссия</h3>
      <div className='px-4 space-x-4 flex'>
        <ListCheckboxWithSearch
          list={transmissionList}
          getCheckboxes={(checkboxes) => {
            getTransmissions(checkboxes.filter((checkbox) => checkbox.isChecked).map((brand) => brand.text))
          }}
        />
      </div>
    </div>
  );
};
