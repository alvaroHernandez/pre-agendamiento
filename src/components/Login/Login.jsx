import React, { useState } from 'react';
import { authenticate } from '../../services/auth/authenticate';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import institutionalTheme from './theme';

import './login.css';

import { useAuth } from '../../context/AuthProvider';

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

  const [loading, setLoading] = React.useState(false);

  const authContext = useAuth();

  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const authResult = await authenticate(username, password);
    if (authResult.error === undefined) {
      setError('');
      setLoading(false);
      authContext.login(authResult);
    } else {
      setLoading(false);
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

  return (
    <ThemeProvider theme={institutionalTheme}>
      <CssBaseline />
      <div className='loginStyle'>
        <Grid container alignItems='center'>
          <Grid item xs={12} align='center'>
            <Typography variant='h4'>Inicia sesión</Typography>
          </Grid>
        </Grid>
        <br></br>
        <Divider variant='middle' />
        <form autoComplete='off' onSubmit={handleLogin} variant='h4'>
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
            style={{
              maxWidth: '486px',
              maxHeight: '56px',
              borderRadius: '4px',
            }}
          >
            {loading ? 'Iniciando' : 'Iniciar sesión'}
          </Button>
          <span>{error}</span>

          <Grid
            container
            direction='column'
            justify='flex-end'
            alignItems='stretch'
            className='labelButtom'
          >
            <Typography variant='body1'>
              <p>
                <b>
                  <u>¿Te olvidaste la contraseña?</u>
                </b>
              </p>
            </Typography>
            <Typography variant='body2'>
              <p>
                ¿No tienes cuenta?{' '}
                <b>
                  <u>Registrarse</u>
                </b>
              </p>
            </Typography>
          </Grid>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default Login;
