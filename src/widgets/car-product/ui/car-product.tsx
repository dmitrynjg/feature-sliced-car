import { CardCar, useCarQuery } from '@/entitites/car';
import Image from 'next/image';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ICar } from '@/entitites/car';

export interface CarProductProps {
  data: ICar | undefined;
}

export const CarProduct: React.FC<CarProductProps> = ({ data }) => {
  return data ? (
    <div className='w-full'>
      <div className='w-full h-100'>
        <Carousel
          responsive={{
            superLargeDesktop: {
              breakpoint: { max: 4000, min: 3000 },
              items: 4,
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 2,
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2,
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
            },
          }}
        >
          {data.images.map((image) => (
            <div
              key={image.id}
              className='h-96 w-full'
            >
              <Image
                alt={image.url}
                src={image.url}
                width={1920}
                height={1080}
                className='h-full w-full object-cover transition-all hover:scale-105'
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className='w-full'>
        <CardCar
          className='p-3'
          id={data.id}
          title={data.title}
          price={data.price}
          color={data.color}
          brand={data.brand}
          yearIssue={data.yearIssue}
          model={data.model}
          engine={data.engine}
          transmission={data.transmission}
          powerReserve={data.powerReserve}
          isNotLink
        />
      </div>
    </div>
  ) : (
    <div>Ничего не найдено</div>
  );
};
