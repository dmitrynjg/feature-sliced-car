import { Pagination } from '@/shared';

export type Engine = 'электрический' | 'дизильный' | 'бензиновый';
export type Transmission = 'автоматическая' | 'ручная' | 'роботизированная';

export type ImageCar = { id: number; url: string };

export interface ICar {
  id: number;
  images: ImageCar[];
  title: string;
  price: number;
  brand: string;
  model: string;
  color: string;
  engine: Engine;
  powerReserve: number | null;
  transmission?: Transmission;
  yearIssue: number;
}

export interface CarsHookType {
  pagination: Pagination;
  list: ICar[];
}