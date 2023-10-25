import { CarResponseType } from '../api/carType';
import { mapCarItem } from './map-cars-item';

export const mapCars = (dto: CarResponseType[]) => dto.map((car) => mapCarItem(car));
