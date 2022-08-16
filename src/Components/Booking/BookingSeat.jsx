import React, { useState } from 'react';
import { Box, Button, Grid, Group, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateBookingTicket } from '../../app/slice/ticketSlice';
import { selectedTicketsState } from '../../app/store';

const BookingSeat = ({ seat }) => {
  const [nameItemLoading, setNameItemLoading] = useState(null);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectedTicketsState);

  const cancelBookingHandler = (seat) => {
    setNameItemLoading(seat.name);
    dispatch(updateBookingTicket({ seat, type: 'cancel' }));
  };

  return (
    <Grid.Col sm={4}>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
          }).background,
          color: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
          }).color,
          textAlign: 'center',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.md,
          cursor: 'pointer',
        })}
      >
        <Text weight={700} size={24}>
          {seat.name}
        </Text>
      </Box>
      <Group mt={16} position='apart'>
        <Text
          sx={(theme) => ({
            color: theme.colors.blue[6],
            fontSize: 16,
            fontWeight: 500,
          })}
        >
          {seat.price}
        </Text>
        <Button
          onClick={() => cancelBookingHandler(seat)}
          color='red'
          loading={seat.name === nameItemLoading && isLoading}
        >
          Cancel
        </Button>
      </Group>
    </Grid.Col>
  );
};

export default BookingSeat;
