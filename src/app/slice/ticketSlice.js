import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const URL = 'https://62f71205ab9f1f8e89f8052a.mockapi.io/movie-tickets';

const initialState = {
  tickets: [],
  selectedSeats: JSON.parse(localStorage.getItem('seats')) || [],
  isLoading: false,
  error: null,
};

export const getTickets = createAsyncThunk(
  'ticket/getTickets',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(URL);
      return data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

export const updateBookingTicket = createAsyncThunk(
  'ticket/updateTicket',
  async (payload, { getState, dispatch, rejectWithValue }) => {
    try {
      const { seat, type } = payload;
      const { tickets } = getState().tickets;
      const row = seat.name.slice(0, 1);
      const foundedRow = tickets.find((item) => item.row === row);
      const { seats } = foundedRow;
      let updatedRow = {};
      if (type === 'book') {
        const updatedSeats = seats.map((item) => {
          return item.name === seat.name ? { ...item, booked: true } : item;
        });
        updatedRow = {
          ...foundedRow,
          seats: updatedSeats,
        };
      }

      if (type === 'cancel') {
        const updatedSeats = seats.map((item) => {
          return item.name === seat.name ? { ...item, booked: false } : item;
        });
        updatedRow = {
          ...foundedRow,
          seats: updatedSeats,
        };
      }

      await axios.put(`${URL}/${foundedRow.id}`, updatedRow);
      dispatch(getTickets());
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const selectSeatHandler = (state, { payload }) => {
  const { selectedSeats } = state;
  const isSeatExisted = selectedSeats.some(
    (item) => item.name === payload.name
  );
  if (isSeatExisted) {
    const updatedSeats = [
      ...selectedSeats.filter((seat) => seat.name !== payload.name),
    ];
    localStorage.setItem('seats', JSON.stringify(updatedSeats));
    return {
      ...state,
      selectedSeats: updatedSeats,
    };
  } else {
    const updatedSeats = [...selectedSeats, payload];
    localStorage.setItem('seats', JSON.stringify(updatedSeats));
    return {
      ...state,
      selectedSeats: updatedSeats,
    };
  }
};

const removeAllSeatHandler = (state, action) => {
  localStorage.removeItem('seats');
  state.selectedSeats = [];
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    selectSeatReducer: selectSeatHandler,
    removeAllSeatReducer: removeAllSeatHandler,
  },

  extraReducers: (builder) => {
    // getTickets
    builder
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, { payload }) => {
        state.tickets = payload;
        state.isLoading = false;
      })
      .addCase(getTickets.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { selectSeatReducer, removeAllSeatReducer } = ticketSlice.actions;

export default ticketSlice.reducer;
