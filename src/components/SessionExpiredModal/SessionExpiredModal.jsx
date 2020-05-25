import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import React from 'react';
import PropTypes from 'prop-types';

const SessionExpiredModal = ({ open, handleClose }) => (
  <Dialog
    open={open}
    aria-labelledby='alert-dialog-title'
    aria-describedby='alert-dialog-description'
  >
    <DialogTitle id='alert-dialog-title'>{'Sesión Expirada'}</DialogTitle>
    <DialogContent>
      <DialogContentText id='alert-dialog-description'>
        La sesión ha caducado. Por favor vuelve a loguearte.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color='primary'>
        Ir al Login
      </Button>
    </DialogActions>
  </Dialog>
);

export default SessionExpiredModal;

SessionExpiredModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
