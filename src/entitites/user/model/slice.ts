import { createSlice, Middleware } from '@reduxjs/toolkit';
import { User } from '../api/userType';

export interface SliceType {
  user: User | {};
  jwt: string;
}

const initialState: SliceType = {
  user: {},
  jwt: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setJwt: (state, action) => {
      state.jwt = action.payload;
    },
  },
});

export const { setJwt, setUser } = userSlice.actions;

export const jwtMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === 'persistJwt') {
    const jwt: string | null = localStorage.getItem('jwt');
    store.dispatch(setJwt(jwt || '')); // Если jwt null, устанавливаем пустую строку
  } else if (action.type === 'user/setJwt') {
    if (action.payload) {
      localStorage.setItem('jwt', action.payload);
    }
  }

  return next(action);
};

export const userReducer = userSlice.reducer;
