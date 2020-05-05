import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { createCurrentWeek, createCalendar, createCalendarRow } from '../../services/AppointmentTableService';
import hourAvailability from '../../data/HourAvailabilityType';

import './tableAvailability.css';

const HeaderDatesOfCurrentWeek = (props) => {
  const { dates } = props;
  const headerDates = dates.map((date) => (
    <TableCell align="center">{date}</TableCell>
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

const BodyRowsDateAvailability = (props) => {
  const rows = createCalendarRow(props.calendar, props.dates);

  const onCellClickHandler = (key, columnName, isAvailable) => {
    console.log("cell clicked");
    console.log(key);
    console.log(columnName);
    console.log(isAvailable);
    if (isAvailable === hourAvailability.AVAILABLE) {
      isAvailable = hourAvailability.NOT_AVAILABLE;
      console.log("Before was available, now not");
      console.log(isAvailable);
    }
  };

  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.hour}>
          <TableCell
            align="center"
            component="th"
            scope="row"
            style={{ backgroundColor: 'white', color: 'black' }}
            onClick={() => onCellClickHandler(row.hour, props.dates[0])}
          >
            {row.hour}
          </TableCell>
          <TableCell
            onClick={() => onCellClickHandler(row.hour, props.dates[0], row.monday)}
            class={row.monday === hourAvailability.AVAILABLE ? 'available' : 'notAvailable'}
          />

          <TableCell
            onClick={() => onCellClickHandler(row.hour, props.dates[1], row.tuesday)}
            class={row.tuesday === hourAvailability.AVAILABLE ? 'available' : 'notAvailable'}
          />

          <TableCell
            onClick={() => onCellClickHandler(row.hour, props.dates[2], row.wednesday)}
            class={
              row.wednesday === hourAvailability.AVAILABLE ? 'available' : 'notAvailable'
            }
          />
          <TableCell
            onClick={() => onCellClickHandler(row.hour, props.dates[3], row.thursday)}
            class={row.thursday === hourAvailability.AVAILABLE ? 'available' : 'notAvailable'}
          />
          <TableCell
            onClick={() => onCellClickHandler(row.hour, props.dates[4], row.friday)}
            class={row.friday === hourAvailability.AVAILABLE ? 'available' : 'notAvailable'}
          />
        </TableRow>
      ))}
    </TableBody>
  );
};

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
});

export default function SimpleTableAvailability() {
  const classes = useStyles();
  const [week, setWeek] = useState([]);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setWeek(createCurrentWeek);
    setCalendar(createCalendar);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <HeaderDatesOfCurrentWeek dates={week} />
        <BodyRowsDateAvailability dates={week} calendar={calendar} />
      </Table>
    </TableContainer>
  );
}
