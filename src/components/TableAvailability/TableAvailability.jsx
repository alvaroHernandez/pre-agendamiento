import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  createCurrentWeek,
  createCurrentWeekHeader,
  createCalendar,
  createCalendarRow,
} from '../../services/AppointmentTableService';
import hourAvailability from '../../data/HourAvailabilityType';

import './tableAvailability.css';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const HeaderDatesOfCurrentWeek = (props) => {
  const { dates } = props;
  const headerDates = dates.map((date) => (
    <TableCell key={date} align='center'>
      {date}
    </TableCell>
  ));
  return (
    <TableHead>
      <TableRow>
        <TableCell> </TableCell>
        {headerDates}
      </TableRow>
    </TableHead>
  );
};

HeaderDatesOfCurrentWeek.propTypes = {
  dates: PropTypes.array.isRequired,
};

const BodyRowsDateAvailability = (props) => {
  const [open, setOpen] = useState(false);
  const [infoDescription, setInfoDescription] = useState([]);
  const [infoText, setInfoText] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rows = createCalendarRow(props.centerCalendar, props.dates);

  const onCellClickHandler = (appointment) => {
    if (appointment.type === hourAvailability.AVAILABLE) {
      handleClickOpen();
      setInfoDescription('Horario disponible');
      setInfoText('El centro tiene un cupo disponible en este horario');
    } else if (appointment.type === hourAvailability.USER_APPOINTMENT) {
      handleClickOpen();
      const textToDisplay = `Fecha: ${appointment.date} \nHora: ${appointment.hour}`;
      setInfoDescription(appointment.description);
      setInfoText(textToDisplay);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          {infoDescription}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{infoText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* TODO: ask if its necessary */}
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <Button autoFocus onClick={handleClose} color='primary'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.hour}>
            <TableCell
              align='center'
              component='th'
              scope='row'
              style={{ backgroundColor: 'white', color: 'black' }}
              onClick={() => onCellClickHandler(row.hour, props.dates[0])}
            >
              {row.hour}
            </TableCell>
            <TableCell
              onClick={() => onCellClickHandler(row?.monday)}
              className={row?.monday?.type}
            >
              {row.monday?.type !== 'available' ? row.monday?.description : ''}
            </TableCell>

            <TableCell
              onClick={() => onCellClickHandler(row?.tuesday)}
              className={row.tuesday?.type}
            >
              {row.tuesday?.type !== 'available'
                ? row.tuesday?.description
                : ''}
            </TableCell>

            <TableCell
              onClick={() => onCellClickHandler(row?.wednesday)}
              className={row.wednesday?.type}
            >
              {row.wednesday?.type !== 'available'
                ? row.wednesday?.description
                : ''}
            </TableCell>
            <TableCell
              onClick={() => onCellClickHandler(row?.thursday)}
              className={row.thursday?.type}
            >
              {row.thursday?.type !== 'available'
                ? row.thursday?.description
                : ''}
            </TableCell>
            <TableCell
              onClick={() => onCellClickHandler(row?.friday)}
              className={row.friday?.type}
            >
              {row.friday?.type !== 'available' ? row.friday?.description : ''}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </React.Fragment>
  );
};

BodyRowsDateAvailability.propTypes = {
  centerCalendar: PropTypes.any.isRequired,
  dates: PropTypes.array.isRequired,
};

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
});

const TableAvailability = ({ appointments }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='Availability'>
        <HeaderDatesOfCurrentWeek dates={createCurrentWeekHeader()} />
        <BodyRowsDateAvailability
          dates={createCurrentWeek()}
          centerCalendar={createCalendar(appointments)}
        />
      </Table>
    </TableContainer>
  );
};

TableAvailability.propTypes = {
  appointments: PropTypes.any.isRequired,
};

export default TableAvailability;
