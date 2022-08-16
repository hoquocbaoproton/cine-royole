import { Container } from '@mantine/core';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Booking from './Components/Booking/Booking';
import TicketsList from './Components/Tickets/TicketsList';
import HeaderNavigation from './Components/UI/HeaderNavigation/HeaderNavigation';

function App() {
  return (
    <>
      <HeaderNavigation />
      <Container size='xl'>
        <Routes>
          <Route path='/' element={<TicketsList />} />
          <Route path='/booking' element={<Booking />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
