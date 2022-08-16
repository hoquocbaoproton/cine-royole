import { Box, Center, Grid, Group, Text, Title } from '@mantine/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets } from '../../app/slice/ticketSlice';
import { selectedTicketsState } from '../../app/store';
import MovieDetail from '../MovieDetail/MovieDetail';
import BookingItem from './BookingSeat';

const Booking = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector(selectedTicketsState);

  const bookedSeats = tickets
    ?.map((ticket) => ticket.seats)
    .flat()
    .filter((item) => item.booked);

  const totalBookingAmount = bookedSeats
    .map((item) => item.price)
    .reduce((prev, cur) => {
      return prev + cur;
    }, 0);

  useEffect(() => {
    dispatch(getTickets());
  }, []);

  return (
    <Grid>
      <Grid.Col mt={24} sm={6}>
        <MovieDetail />
      </Grid.Col>
      <Grid.Col sm={6}>
        <Center>
          <Title order={2}>Your order:</Title>
        </Center>
        <Box
          sx={(theme) => ({
            height: 560,
            overflowY: 'scroll',
          })}
        >
          <Grid align='flex-start' justify='flex-start' gutter={24} my={16}>
            {bookedSeats.map((seat) => {
              return <BookingItem key={seat.name} seat={seat} />;
            })}
          </Grid>
        </Box>

        {bookedSeats.length > 0 && (
          <Group position='apart' align='center'>
            <Title order={4}>Total Amount:</Title>
            <Text
              sx={(theme) => ({
                fontSize: 24,
                color: theme.colors.green[6],
                fontWeight: 700,
              })}
            >
              {totalBookingAmount}
            </Text>
          </Group>
        )}
      </Grid.Col>
    </Grid>
  );
};

export default Booking;
