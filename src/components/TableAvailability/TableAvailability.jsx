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

import './TableAvailability.css';

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
  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.hour}>
          <TableCell
            align="center"
            component="th"
            scope="row"
            style={{ backgroundColor: 'grey', color: 'white' }}
          >
            {row.hour}
          </TableCell>
          <TableCell
            class={row.monday === 'disponible' ? 'available' : 'notavailable'}
          />

          <TableCell
            class={row.tuesday === 'disponible' ? 'available' : 'notavailable'}
          />

          <TableCell
            class={
              row.wednesday === 'disponible' ? 'available' : 'notavailable'
            }
          />
          <TableCell
            class={row.thursday === 'disponible' ? 'available' : 'notavailable'}
          />
          <TableCell
            class={row.friday === 'disponible' ? 'available' : 'notavailable'}
          />
        </TableRow>
      ))}
    </TableBody>
  );
};

const useStyles = makeStyles({
  table: {
    minWidth: 450,
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
