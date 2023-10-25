import { setJwt, setUser } from '@/entitites/user';
import { Button } from '@/shared';
import { useDispatch } from 'react-redux';

export const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Button
      variant='outline'
      className='text-red-500 hover:text-red-600 w-full'
      onClick={() => {
        localStorage.removeItem('jwt');
        dispatch(setUser({}));
        dispatch(setJwt(null));
      }}
    >
      Выйти
    </Button>
  );
};
