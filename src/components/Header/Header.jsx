import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Logout from '../Logout/Logout';
import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FeatureToggles from './../../toggles/FeatureToggles';
import { useAuth } from '../../context/AuthProvider';

const WELCOME_TO_MESSAGE = `Bienvenido a Pre-Agendamiento!`;
const WELCOME_MESSAGE = `Bienvenido`;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  backgroundColor: '#FFFFFF',
}));

const Header = () => {
  const classes = useStyles();

  const { authenticatedUser } = useAuth();

  function renderWelcomeMessage() {
    return FeatureToggles.DISPLAY_USERNAME_HEADER ? (
      <>{WELCOME_TO_MESSAGE + ' ' + authenticatedUser.userName}</>
    ) : (
      <>{WELCOME_MESSAGE}</>
    );
  }

  return (
    <AppBar
      color='primary'
      position='static'
      style={{ background: '#20673e', boxShadow: 'none' }}
    >
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        ></IconButton>
        <Typography variant='h6' className={classes.title}>
          {renderWelcomeMessage()}
        </Typography>
        <Logout />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
