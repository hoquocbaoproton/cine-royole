import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const URL = 'https://62f71205ab9f1f8e89f8052a.mockapi.io/movie-tickets';

const initialState = {
  tickets: [],
  selectedSeats: [],
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

// export const updateAllBookingTicket = createAsyncThunk(
//   'ticket/updateAllTicket',
//   async (payload, { getState, dispatch, rejectWithValue }) => {
//     try {
//       const { tickets } = getState().tickets;
//       const payloadPromises = payload.map((item) => {
//         const row = item.name.slice(0, 1);
//         const foundedRow = tickets.find((item) => item.row === row);
//         const { seats } = foundedRow;
//         const updatedSeats = seats.map((seat) => {
//           return seat.name === item.name ? { ...seat, booked: true } : seat;
//         });
//         const updatedRow = {
//           ...foundedRow,
//           seats: updatedSeats,
//         };
//         return new Promise((resolve, reject) => {
//           axios.put(`${URL}/${foundedRow.id}`, updatedRow);
//         });
//       });

//       Promise.all(payloadPromises).then((results) => {
//         results();
//       });
//     } catch (error) {
//       throw rejectWithValue(error.response.data);
//     }
//   }
// );

const selectSeatHandler = (state, { payload }) => {
  const { selectedSeats } = state;
  const isSeatExisted = selectedSeats.some(
    (item) => item.name === payload.name
  );
  if (isSeatExisted) {
    return {
      ...state,
      selectedSeats: [
        ...selectedSeats.filter((seat) => seat.name !== payload.name),
      ],
    };
  } else {
    return {
      ...state,
      selectedSeats: [...selectedSeats, payload],
    };
  }
};

const removeAllSeatHandler = (state, action) => {
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
