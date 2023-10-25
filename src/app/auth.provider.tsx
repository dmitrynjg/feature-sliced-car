import { setUser, useGetUserQuery, setJwt } from '@/entitites/user';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data, isLoading } = useGetUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && data) {
      dispatch(setJwt(jwt));
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  return isLoading ? (
    <div className='flex items-center justify-center h-screen'>
      <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
    </div>
  ) : (
    <>{children}</>
  );
};
