import { Input } from '@/shared';

export interface FilterPowerReverseProps {
  getPowerReverse: (powerReverse: number) => void;
}

export const FilterPowerReverse: React.FC<FilterPowerReverseProps> = ({ getPowerReverse }) => {
  return (
    <div className='px-3 py-2'>
      <h3 className='mb-2 px-4 text-lg font-semibold tracking-tight'>Запас хода</h3>
      <div className='px-4 space-x-4 flex'>
        <Input
          placeholder='Запас хода'
          type='number'
          onChange={(e) => getPowerReverse(Number(e.target.value))}
        />
      </div>
    </div>
  );
};
