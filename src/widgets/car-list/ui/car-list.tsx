import { CardCar } from '@/entitites/car';
import { ICar } from '@/entitites/car';

export const CarList = ({ cardList }: { cardList: ICar[] }) => {
  return (
    <div className='flex flex-wrap w-full'>
      <div className='flex justtify-between w-full mb-4'>
        <h2 className='text-2xl font-semibold tracking-tight'>Список автомобилей</h2>
      </div>
      <div className='flex flex-wrap w-full'>
        {cardList.length === 0 && <div className='font-semibold'>Ничего не найдено</div>}
        {cardList.map((card: any) => (
          <CardCar
            id={card.id}
            powerReserve={null}
            key={card.id}
            poster={card.images && card.images.length > 0 ? card.images[0].url : ''}
            title={card.title}
            price={card.price}
            color={card.color}
            brand={card.brand}
            yearIssue={card.yearIssue}
            model={card.model}
            engine={card.engine}
            className={'w-[32%] mt-2 mr-2'}
          />
        ))}
      </div>
      {/* console.log(data?.pagination.page, data?.pagination.pageCount); */}
    </div>
  );
};
