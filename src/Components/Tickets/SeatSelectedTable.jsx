import {
  Button,
  Center,
  Grid,
  Group,
  ScrollArea,
  Table,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  removeAllSeatReducer,
  selectSeatReducer,
  updateBookingTicket,
} from '../../app/slice/ticketSlice';

const SeatSelectedTable = ({ selectedSeats, onLoading }) => {
  const dispatch = useDispatch();

  const selectSeatHandler = (seat) => {
    dispatch(selectSeatReducer(seat));
  };

  const removeAllSeatHandler = () => {
    dispatch(removeAllSeatReducer());
  };

  // const bookAllHandler = (selectedSeats) => {
  //   dispatch(updateAllBookingTicket(selectedSeats));
  // };

  const bookTicketHandler = (seat) => {
    onLoading(seat.name);
    console.log(updateBookingTicket({ seat, type: 'book' }));
    dispatch(updateBookingTicket({ seat, type: 'book' }));
    dispatch(selectSeatReducer(seat));
  };

  const selectedSeatsTotalAmount = selectedSeats
    .filter((seat) => !seat.booked)
    .map((seat) => seat.price)
    .reduce((prev, cur) => {
      return prev + cur;
    }, 0);

  const rows = selectedSeats
    .map((seat) => {
      return (
        <tr key={seat.name}>
          <td>
            <Text
              sx={(theme) => ({
                fontWeight: 700,
                color: theme.colors.cyan[3],
                fontSize: 16,
              })}
            >
              {seat.name}
            </Text>
          </td>
          <td>{seat.price}</td>
          <td>
            <Group position='center'>
              <Button onClick={() => bookTicketHandler(seat)} variant='light'>
                Book
              </Button>
              <Button
                onClick={() => selectSeatHandler(seat)}
                variant='outline'
                color='red'
              >
                Remove
              </Button>
            </Group>
          </td>
        </tr>
      );
    })
    .reverse();

  return (
    <>
      <ScrollArea
        style={{ height: 160 }}
        scrollbarSize={2}
        scrollHideDelay={6000}
      >
        <Table>
          <thead
            style={{
              position: 'sticky',
              top: '0',
              zIndex: 1000,
              backgroundColor: '#1d1e30',
            }}
          >
            <tr>
              <th>Position</th>
              <th>Price</th>
              <th>
                <Center>Action</Center>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      <Grid align='center' justify='space-between' mt={8}>
        <Grid.Col sm={4}>
          <Title order={4}>Total:</Title>
        </Grid.Col>
        <Grid.Col sm={4}>
          <Title color='green' order={4}>
            {selectedSeatsTotalAmount}
          </Title>
        </Grid.Col>
        <Grid.Col sm={4}>
          <Group position='right'>
            <Button>Book all</Button>
            <Button onClick={removeAllSeatHandler} variant='light' color='red'>
              Remove all
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default SeatSelectedTable;
