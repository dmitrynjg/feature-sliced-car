import { carMiddleware } from '@/entitites/car';
import { uploadMiddleware } from '@/entitites/upload';
import { jwtMiddleware, userMiddleware } from '@/entitites/user';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer as unknown as typeof rootReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    carMiddleware,
    userMiddleware,
    jwtMiddleware,
    uploadMiddleware,
  ]
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
