import { mapImageItem } from './map-image-item';
import { FieldImage } from '../api';

export const mapImages = (dto: FieldImage[]) => dto.map((image: FieldImage) => mapImageItem(image));
