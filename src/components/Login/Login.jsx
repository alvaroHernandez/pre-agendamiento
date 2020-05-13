import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authenticate } from '../../clients/authenticate';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import './login.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    const authResult = await authenticate(username, password);
    if (authResult.token !== undefined) {
      setError('');
      await localStorage.setItem('access_token', authResult.token);
      await localStorage.setItem('user_id', authResult.id);
      await localStorage.setItem('user_name', authResult.name)
      history.push('/');
    } else {
      setError(authResult.error);
    }
  };

  const onChangeEventValueUsername = (event) => {
    setUsername(event.target.value)
  };

  const onChangeEventValuePassword = (event) => {
    setPassword(event.target.value)
  };

  const classes = useStyles();

  return (
      <div className="loginStyle">
        <form autoComplete="off" onSubmit={handleLogin}>
          <TextField id="outlined-user" required label="Nombre" variant="outlined" value={username} onChange={onChangeEventValueUsername}/>
          <br />
          <TextField id="outlined-pass" required label="Password" variant="outlined" value={password} onChange={onChangeEventValuePassword} type="password"/>
          <br />
      <Button variant="contained" color="primary" type="submit" value="Acceder">
        Iniciar Sesión
      </Button>
      <span>{error}</span>
    </form>
    </div>
  );
};

export default Login;
