import { configureStore } from '@reduxjs/toolkit';

import ticketReducer from './slice/ticketSlice';

export const store = configureStore({
  reducer: {
    tickets: ticketReducer,
  },
});

export const selectedTicketsState = (state) => state.tickets;
