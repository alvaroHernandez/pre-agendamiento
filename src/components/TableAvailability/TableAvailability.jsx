import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const apiResponse = {
  centros: [
    {
      id: "d30cd5da-8424-4922-a7ff-4ecb670a6c0a",
      nombre: "ACHS principal",
      disponibilidad: [
        {
          date: "27/4/2020",
          hourFrom: "10:00",
          hourTo: "11:00",
        },
        {
          date: "28/4/2020",
          hourFrom: "12:00",
          hourTo: "13:00",
        },
        {
          date: "29/4/2020",
          hourFrom: "15:00",
          hourTo: "16:00",
        },
      ],
    },
  ],
};

const coreHourCenter = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const createCurrentWeek = () => {
  const currentDay = new Date();
  const currentWeek = [];
  for (let day = 1; day <= 5; day++) {
    const dayOfWeek = currentDay.getDate() - currentDay.getDay() + day;
    const date = new Date(currentDay.setDate(dayOfWeek));
    const dateString = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    currentWeek.push(dateString);
  }
  return currentWeek;
};

const createCalendar = () => {
  const oneCenterAvailability = apiResponse.centros[0].disponibilidad;
  const currentWeek = createCurrentWeek();
  const calendar = {};
  currentWeek.forEach((day) => {
    calendar[day] = {};
  });
  const datesOfCalendar = Object.keys(calendar);
  const startHour = [];
  oneCenterAvailability.forEach((availability) => {
    if (datesOfCalendar.includes(availability.date)) {
      startHour.push(availability.hourFrom);
    }
    calendar[availability.date] = startHour;
  });
  return calendar;
};

function createData(hour, monday, tuesday, wednesday, thursday, friday) {
  return {
    hour,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
  };
}

function createCalendarRow(calendar, datesOfWeek) {
  const rows = [];
  coreHourCenter.forEach((hour) => {
    const weekHourData = [];
    datesOfWeek.forEach((date) => {
      const availableHoursFromOfDay = calendar[date];
      if (
        availableHoursFromOfDay instanceof Array &&
        availableHoursFromOfDay.includes(hour)
      ) {
        weekHourData.push("disponible"); // is available (free slot)
      } else {
        weekHourData.push("no disponible"); // is not available (busy slot)
      }
    });
    rows.push(
      createData(
        hour,
        weekHourData[0],
        weekHourData[1],
        weekHourData[2],
        weekHourData[3],
        weekHourData[4]
      )
    );
  });
  return rows;
}

const HeaderDatesOfCurrentWeek = (props) => {
  const { dates } = props;
  const headerDates = dates.map((date) => (
    <TableCell align="right">{date}</TableCell>
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
            component="th"
            scope="row"
            style={{ backgroundColor: "grey", color: "white" }}
          >
            {row.hour}
          </TableCell>
          <TableCell align="right">{row.monday}</TableCell>
          <TableCell align="right">{row.tuesday}</TableCell>
          <TableCell align="right">{row.wednesday}</TableCell>
          <TableCell align="right">{row.thursday}</TableCell>
          <TableCell align="right">{row.friday}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
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
