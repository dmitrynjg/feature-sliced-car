import { FieldImage } from '../api';

export const mapImageItem = (dto: FieldImage) => {
  return { id: dto.id, url: dto.attributes.url };
};
