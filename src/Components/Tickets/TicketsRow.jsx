import { Text } from '@mantine/core';
import React from 'react';

const TicketsRow = ({ children }) => {
  return (
    <Text size='xl' weight={700}>
      {children}
    </Text>
  );
};

export default TicketsRow;
