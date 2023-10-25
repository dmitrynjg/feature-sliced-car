import { carReducerApi, carReducerPath } from '@/entitites/car';
import { userReducerApi, userReducerPath } from '@/entitites/user';
import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from '@/entitites/user';
import { uploadReducerApi, uploadReducerPath } from '@/entitites/upload';

export const rootReducer = combineReducers({
  [carReducerPath]: carReducerApi,
  [userReducerPath]: userReducerApi,
  [uploadReducerPath]: uploadReducerApi,
  user: userReducer,
});
