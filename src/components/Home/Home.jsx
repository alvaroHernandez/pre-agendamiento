import React from 'react';
import Header from '../Header/Header';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AppointmentScheduler from '../AppointmentScheduler/AppointmentScheduler';

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: '12px',
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <Container className={classes.container}>
        <AppointmentScheduler />
      </Container>
    </div>
  );
};

export default Home;
