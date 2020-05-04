import React, { useEffect, useState } from 'react';
import { createCurrentWeek, createCalendar, createCalendarRow } from '../../services/AppointmentTableService';
import hourAvailability from '../../data/HourAvailabilityType';
import './tableAvailability.css';

const HeaderDatesOfCurrentWeek = (props) => {
  const { dates } = props;
  const headerDates = dates.map((date) => (
    <th  key={date}>{date}</th>
  ));
  return (
    <thead>
      <tr>
        <th> </th>
        {headerDates}
      </tr>
    </thead>
  );
};

const BodyRowsDateAvailability = (props) => {
  const rows = createCalendarRow(props.calendar, props.dates);
  const onCellClickHandler = (key, columnName, isAvailable) => {
    if (isAvailable === hourAvailability.AVAILABLE) {
      isAvailable = hourAvailability.NOT_AVAILABLE;
    }
  };

  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row.hour}>
          <td
            className ="timeHeader"
            onClick={() => onCellClickHandler(row.hour, "columnName")}
          >
            {row.hour}
          </td>
          <td
            onClick={() => onCellClickHandler(row.hour, "columnName", row.monday)}
            className={row.monday === hourAvailability.AVAILABLE ? 'available' : 'notAvailable'}
          />
          <td
            className={row.tuesday === hourAvailability.AVAILABLE ? 'available' : 'notAvailable'}
          />
          <td
            className={
              row.wednesday === hourAvailability.AVAILABLE ? 'available' : 'notAvailable'
            }
          />
          <td
            className={row.thursday === hourAvailability.AVAILABLE ? 'available' : 'notAvailable'}
          />
          <td
            className={row.friday === hourAvailability.AVAILABLE ? 'available' : 'notAvailable'}
          />
        </tr>
      ))}
    </tbody>
  );
};

export default function SimpleTableAvailability() {
  const [week, setWeek] = useState([]);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setWeek(createCurrentWeek);
    setCalendar(createCalendar);
  }, []);

  return (
    <table>
      <HeaderDatesOfCurrentWeek dates={week} />
      <BodyRowsDateAvailability dates={week} calendar={calendar} />
    </table>
  );
}