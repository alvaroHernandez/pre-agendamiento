import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    fetch('https://dev-pre-agendamiento.azure-api.net/Login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username, password }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((body) => {
            setError('');
            localStorage.setItem('access_token', body.token);
            history.push('/');
          });
        } else if (response.status === 401) {
          setError('Nombre y Password incorrecto');
        } else {
          setError('Servicio no disponible');
          return Promise.reject(
            new Error('Error en el servicio de autenticación'),
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Nombre:
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
        />
      </label>
      <label>
        Password:
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
        />
      </label>
      <input type="submit" value="Acceder" />
      <span>{error}</span>
    </form>
  );
};

export default Login;
