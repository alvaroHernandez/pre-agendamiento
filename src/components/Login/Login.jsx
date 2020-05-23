import React, { useState } from 'react';
import history from '../../services/history';
import { authenticate } from '../../clients/authenticate';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import './login.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    input: {
      color: 'white',
    },
  },
}));

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    const authResult = await authenticate(username, password);
    if (authResult.token !== undefined) {
      setError('');
      await localStorage.setItem('access_token', authResult.token);
      await localStorage.setItem('user_id', authResult.id);
      await localStorage.setItem('user_name', authResult.name);
      history.push('/');
    } else {
      setError(authResult.error);
    }
  };

  const onChangeEventValueUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangeEventValuePassword = (event) => {
    setPassword(event.target.value);
  };

  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const institutionalTheme = createMuiTheme({
    palette: { primary: { 500: '#007a33' } },
    typography: {
      button: {
        textTransform: 'none',
      },
    },
  });

  return (
    <ThemeProvider theme={institutionalTheme}>
      <div className='loginStyle'>
        <form autoComplete='off' onSubmit={handleLogin}>
          <TextField
            id='outlined-user'
            required
            label='Nombre'
            variant='outlined'
            value={username}
            onChange={onChangeEventValueUsername}
          />
          <br />
          <TextField
            id='outlined-pass'
            required
            label='Password'
            variant='outlined'
            value={password}
            onChange={onChangeEventValuePassword}
            type='password'
          />
          <br />
          <Button
            variant='contained'
            color='primary'
            type='submit'
            value='Acceder'
          >
            Iniciar Sesión
          </Button>
          <span>{error}</span>
          <br></br>
          <p>
            <b>
              <u>¿Te olvidaste la contraseña?</u>
            </b>
          </p>
          <p>
            ¿No tienes cuenta?{' '}
            <b>
              <u>Registrarse</u>
            </b>
          </p>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default Login;
