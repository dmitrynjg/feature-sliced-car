import { Separator, Card, CardHeader, CardContent, CardTitle, CardFooter, NumberFormatter } from '@/shared';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ICar, Transmission } from '../model';

export interface CardCarProps extends Omit<ICar, 'images' | 'powerReverse'> {
  poster?: string;
  isNotLink?: boolean;
  className?: string;
}

export const CardCar: React.FC<CardCarProps> = ({
  id,
  poster,
  title,
  price,
  brand,
  model,
  color,
  engine,
  yearIssue,
  transmission,
  powerReserve,
  isNotLink,
  className,
}) => {

  const [footerContent, setFooterContent] = useState([
    { name: 'бренд', value: brand },
    { name: 'модель', value: model },
    { name: 'цвет', value: color },
    { name: 'движок', value: engine },
    { name: 'год производства', value: yearIssue },
  ]);

  useEffect(() => {
    const newFooterContent = [];
    if (transmission) {
      newFooterContent.push({ name: 'трансмиссия', value: transmission })
    }
    if (powerReserve) {
      newFooterContent.push({ name: 'Запас хода', value: powerReserve });
    }
    setFooterContent([...footerContent, ...newFooterContent]);
  }, []);

  const CardFooterContent = () => (

    <div className='w-full'>
      {footerContent.map((footerItem) => (
        <div
          className='w-full'
          key={footerItem.name}
        >
          <div className='w-full flex justify-between'>
            <span className='text-gray-500'>{footerItem.name}</span>
            <span className='font-medium'>{footerItem.value}</span>
          </div>
          <Separator className='my-2' />
        </div>
      ))}
    </div>
  );

  const CardOverview = () => (
    <Card>
      {poster && (
        <CardHeader>
          <Image
            alt={title}
            src={poster}
            width={1920}
            height={1080}
            className='h-96 w-auto object-cover transition-all hover:scale-105'
          />
        </CardHeader>
      )}
      <CardContent>
        <CardTitle className={!poster ? 'mt-4' : ''}>{title}</CardTitle>
        <div className='text-lg mt-2 font-medium'>
          <NumberFormatter number={price} /> RUB
        </div>
      </CardContent>
      <CardFooter>
        <CardFooterContent />
      </CardFooter>
    </Card>
  );

  return isNotLink ? (
    <div className={`${className}`}>
      <CardOverview />
    </div>
  ) : (
    <Link
      className={`${className}`}
      href={`/car/${id}`}
    >
      <CardOverview />
    </Link>
  );
};
