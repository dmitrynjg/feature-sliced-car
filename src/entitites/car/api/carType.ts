import { FieldImage } from '@/shared';
import { Item } from '@/shared';
import { Transmission } from '../model';
import { Engine } from '../model';

export type CarResponseType = Item<{
  name: string;
  price: number;
  brand: string;
  model: string;
  color: string;
  images: {
    data: FieldImage[];
  };
  engine: Engine;
  powerReserve: number | null;
  yearIssue: number;
  transmission: Transmission;
}>;
