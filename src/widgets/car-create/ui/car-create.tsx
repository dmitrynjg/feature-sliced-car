import { CreateCarForm } from '@/features/create-car-form';
import { Upload } from '@/features/upload';
import { useState } from 'react';
import { useUploadMutation } from '@/entitites/upload';
import { toast } from '@/shared';
import { useCarCreateMutation } from '@/entitites/car';
import { useRouter } from 'next/router';

export const CarCreate = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [upload] = useUploadMutation();
  const [createCar] = useCarCreateMutation();
  const router = useRouter();

  return (
    <div className='w-1/2'>
      <div className='w-full'>
        <h2 className='text-2xl font-semibold tracking-tight mb-4'>Добавление автомобиля</h2>
        <Upload
          className='mb-4'
          label='Загрузить изображения автомобиля'
          getImages={(images) => {
            setImages(images);
          }}
        />
        <CreateCarForm
          submit={async (values) => {
            if (images) {
              const formData = new FormData();
              Object.values(images).forEach((file) => {
                formData.append('files', file);
              });

              const carResponse: any = await createCar(values);

              if (carResponse.error) {
                toast({
                  title: 'Создание машины',
                  description: 'Не удалось загрузить данные о машине',
                  variant: 'destructive',
                });
                return;
              }
              const carId = carResponse.data.data.id;
              formData.append('ref', 'api::car.car');
              formData.append('refId', carId);
              formData.append('field', 'images');

              const filesResponse: any = await upload(formData);
              if (filesResponse.error) {
                toast({
                  title: 'Создание машины',
                  description: 'Не удалось загрузить изображение машины',
                  variant: 'destructive',
                });
                return;
              }
              toast({
                title: 'Создание машины',
                description: 'Прошло успешно',
              });
              router.push(`/car/${carId}`);
            } else {
              toast({
                title: 'Создание машины',
                description: 'Вы не загрузили изображения',
                variant: 'destructive',
              });
            }
          }}
        />
      </div>
    </div>
  );
};
