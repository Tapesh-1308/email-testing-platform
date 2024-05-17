import { configureStore } from '@reduxjs/toolkit';
import emailsReducer from './emailsSlice';

const store = configureStore({
  reducer: {
    emails: emailsReducer
  }
});

export default store;
