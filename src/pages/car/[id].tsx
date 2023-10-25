import { AppNavbar } from '@/widgets/app-navbar';
import { Content } from '@/layout/content';
import { CarProduct } from '@/widgets/car-product';
import { useRouter } from 'next/router';
import { useCarQuery } from '@/entitites/car';

export default function Car() {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '';
  const { data } = useCarQuery({
    id: Number(id),
    params: {
      populate: 'images',
    },
  });
  
  return (
    <div>
      <AppNavbar />
      <Content className='flex jutify-between'>
        <CarProduct data={data} />
      </Content>
    </div>
  );
}
