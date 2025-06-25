import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slices/blogSlice';
import uiReducer from './slices/uiSlice';
import newsletterReducer from './slices/newsletterSlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    ui: uiReducer,
    newsletter: newsletterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;