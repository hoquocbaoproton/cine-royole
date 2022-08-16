import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { createStyles, Header, Container, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const HEADER_HEIGHT = 80;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}));

export default function HeaderNavigation() {
  const { classes, cx } = useStyles();
  const [isActive, setIsActive] = useState(0);

  const links = [
    {
      label: 'Seat',
      path: '',
    },
    {
      label: 'Your booking',
      path: 'booking',
    },
  ];

  const items = links.map((link, i) => (
    <NavLink
      key={link.label}
      to={link.path}
      onClick={() => {
        setIsActive(i);
      }}
      className={cx(classes.link, { [classes.linkActive]: isActive === i })}
    >
      <Title order={5}>{link.label}</Title>
    </NavLink>
  ));

  return (
    <Header height={HEADER_HEIGHT} mb={16} className={classes.root}>
      <Container size='xl' className={classes.header}>
        <Title>Cine Royole</Title>
        <Group spacing='xs' className={classes.links}>
          {items}
        </Group>
      </Container>
    </Header>
  );
}
