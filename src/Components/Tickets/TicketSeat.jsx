import { Box } from '@mantine/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectSeatReducer } from '../../app/slice/ticketSlice';

const TicketSeat = ({ children, seat, isSelected, nameIsLoading }) => {
  const dispatch = useDispatch();
  const selectSeatHandler = () => {
    if (seat.booked) return;
    dispatch(selectSeatReducer(seat));
  };

  return (
    <Box
      onClick={selectSeatHandler}
      sx={(theme) => ({
        backgroundColor: seat.booked
          ? theme.colors.blue
          : isSelected
          ? theme.colors.green[7]
          : nameIsLoading === seat.name
          ? theme.colors.green[9]
          : theme.colors.dark[6],
        textAlign: 'center',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.md,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: seat.booked
            ? theme.colors.blue[9]
            : isSelected
            ? theme.colors.green[8]
            : theme.colors.dark[5],
        },
      })}
    >
      {children}
    </Box>
  );
};

export default TicketSeat;
