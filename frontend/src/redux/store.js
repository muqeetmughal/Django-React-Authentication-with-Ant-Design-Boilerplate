import { configureStore } from '@reduxjs/toolkit';


import authReducer from 'redux/features/authSlice'
import themeReducer from 'redux/features/themeSlice'
import usersReducer from 'redux/features/usersSlice'
import accessReducer from 'redux/features/accessSlice'
import appConfigs from 'common/appConfigs';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    users: usersReducer,
    access: accessReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: appConfigs.DEBUG || true
});
