import { Grid, Table, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets } from '../../app/slice/ticketSlice';
import { selectedTicketsState } from '../../app/store';
import SeatSelectedTable from './SeatSelectedTable';
import TicketSeat from './TicketSeat';
import TicketsRow from './TicketsRow';

const TicketsList = () => {
  const [nameIsLoading, setNameIsLoading] = useState(null);
  const dispatch = useDispatch();
  const { tickets } = useSelector(selectedTicketsState);
  const { selectedSeats } = useSelector(selectedTicketsState);

  useEffect(() => {
    dispatch(getTickets());
  }, []);

  return (
    <>
      <Grid>
        <Grid.Col sm={2}></Grid.Col>
        <Grid.Col sm={10}>
          <Grid>
            {tickets[0]?.seats.map((seat, i) => {
              return (
                <Grid.Col key={seat.name} sm={1}>
                  <Text align='center' weight={700}>
                    {i + 1}
                  </Text>
                </Grid.Col>
              );
            })}
          </Grid>
        </Grid.Col>
      </Grid>
      {tickets?.map((ticket) => {
        return (
          <Grid key={ticket.id}>
            <Grid.Col sm={2}>
              <TicketsRow>{ticket.row}</TicketsRow>
            </Grid.Col>
            <Grid.Col sm={10}>
              <Grid gutter={16}>
                {ticket.seats.map((seat) => {
                  return (
                    <Grid.Col key={seat.name} sm={1}>
                      <TicketSeat
                        isSelected={selectedSeats.some(
                          (item) => item.name === seat.name
                        )}
                        seat={seat}
                        nameIsLoading={nameIsLoading}
                      >
                        {seat.name}
                      </TicketSeat>
                    </Grid.Col>
                  );
                })}
              </Grid>
            </Grid.Col>
          </Grid>
        );
      })}
      {selectedSeats.length > 0 && (
        <Grid mt={16}>
          <Grid.Col sm={4}>
            <Title order={2}>Your selection:</Title>
          </Grid.Col>
          <Grid.Col sm={8}>
            <SeatSelectedTable
              selectedSeats={selectedSeats}
              onLoading={(name) => setNameIsLoading(name)}
            />
          </Grid.Col>
        </Grid>
      )}
    </>
  );
};

export default TicketsList;
