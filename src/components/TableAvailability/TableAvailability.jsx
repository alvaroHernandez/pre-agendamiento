import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { httpClient } from "../../clients/httpClient";
import { createCurrentWeek, createCalendar,createCalendarRow } from '../../services/AppointmentTableService';
import hourAvailability from '../../data/HourAvailabilityType';

import './tableAvailability.css';

const API_URL = `${process.env.REACT_APP_API_MANAGEMENT_URL}/user/${localStorage.getItem("user_id")}/appointment`;

const HeaderDatesOfCurrentWeek = (props) => {
  const { dates } = props;
  const headerDates = dates.map((date) => (
    <TableCell key={date} align="center">{date}</TableCell>
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
  const rows = createCalendarRow(props.centerCalendar, props.dates);
  const onCellClickHandler = (key, columnName, isAvailable) => {
    if (isAvailable === hourAvailability.AVAILABLE) {
      isAvailable = hourAvailability.CENTER_APPOINTMENT;
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
            onClick={() => onCellClickHandler(row.hour, props.dates[0], row?.monday?.type)}
            className={row?.monday?.type}
          >{(row.monday?.type!='available')?row.monday?.description:''}</TableCell>

          <TableCell
            onClick={() => onCellClickHandler(row.hour, props.dates[1], row.tuesday?.type)}
            className={row.tuesday?.type}
          >{(row.tuesday?.type!='available')?row.tuesday?.description:''}</TableCell>

          <TableCell
            onClick={() => onCellClickHandler(row.hour, props.dates[2], row.wednesday?.type)}
            className={row.wednesday?.type}
          >{(row.wednesday?.type!='available')?row.wednesday?.description:''}</TableCell>
          <TableCell
            onClick={() => onCellClickHandler(row.hour, props.dates[3], row.thursday?.type)}
            className={row.thursday?.type}
          >{(row.thursday?.type!='available')?row.thursday?.description:''}</TableCell>
          <TableCell
            onClick={() => onCellClickHandler(row.hour, props.dates[4], row.friday?.type)}
            className={row.friday?.type}
          >{(row.friday?.type!='available')?row.friday?.description:''}</TableCell>
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

export default function TableAvailability() {

  const classes = useStyles();
  const [week, setWeek] = useState([]);
  const [centerCalendar, setCenterCalendar] = useState([]);

  const setAvailability = (data) => {

    const appointments = createCalendar(data);
    setWeek(createCurrentWeek);
    setCenterCalendar(appointments);
  };

  useEffect(() => {
    console.log("useEffect Table Availability")
    httpClient(
      API_URL,
      "GET",
      (json) => {
        console.log("callback")
        console.log(json)
        setAvailability(json.appointments)

      },
      (error) => {
        setAvailability([]);
      }
    );
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Availability">
        <HeaderDatesOfCurrentWeek dates={week} />
        <BodyRowsDateAvailability dates={week} centerCalendar={centerCalendar}/>
      </Table>
    </TableContainer>
  );
}
