import React from 'react';
import Button from '@material-ui/core/Button';
import useAuth from '../../hooks/useAuth';

const Logout = () => {
  const authContext = useAuth();
  const clickHandler = () => {
    authContext.logout();
  };

  return (
    <Button color='inherit' onClick={clickHandler}>
      logout
    </Button>
  );
};
export default Logout;
