import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authenticate } from '../../clients/authenticate';

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
      localStorage.setItem('access_token', authResult.token);
      history.push('/tabladisponibilidad');
    } else {
      setError(authResult.error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Nombre:
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          required
        />
      </label>
      <label>
        Password:
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          required
        />
      </label>
      <input type="submit" value="Acceder" />
      <span>{error}</span>
    </form>
  );
};

export default Login;
