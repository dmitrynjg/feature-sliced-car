import { AppNavbar } from '@/widgets/app-navbar';
import { Content } from '@/layout/content';
import { Auth } from '@/widgets/auth';
import { useSearchParams } from 'next/navigation';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const type: string | undefined | null = searchParams?.get('type');

  return (
    <div>
      <AppNavbar />
      <Content className='flex items-center justify-center'>
        <div className='w-2/3 mr-5'>
          <h1 className='text-2xl font-semibold mb-5'>Авторизация и регистрация</h1>
          <Auth formName={typeof type === 'string' ? type : 'register'} />
        </div>
      </Content>
    </div>
  );
}
