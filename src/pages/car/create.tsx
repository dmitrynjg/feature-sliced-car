import { AppNavbar } from '@/widgets/app-navbar';
import { Content } from '@/layout/content';
import { CarCreate } from '@/widgets/car-create';

export default function Car() {
  return (
    <div>
      <AppNavbar />
      <Content className='flex jutify-between'>
        <CarCreate/>
      </Content>
    </div>
  );
}
