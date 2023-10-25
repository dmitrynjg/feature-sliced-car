import { mapImages } from '@/shared';
import { CarResponseType } from '../api/carType';
import { ICar } from '../model';

export const mapCarItem = (dto: CarResponseType): ICar => {
  return {
    id: dto.id,
    images: dto.attributes.images && dto.attributes.images.data ? mapImages(dto.attributes.images.data) : [],
    title: dto.attributes.name,
    price: dto.attributes.price,
    transmission: dto.attributes.transmission,
    engine: dto.attributes.engine,
    brand: dto.attributes.brand,
    powerReserve: dto.attributes.powerReserve,
    color: dto.attributes.color,
    model: dto.attributes.model,
    yearIssue: dto.attributes.yearIssue,
  };
};
