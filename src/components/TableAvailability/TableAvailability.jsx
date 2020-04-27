import React, { useEffect, useState } from "react";

const apiResponse = {
  centros: [
    {
      id: "d30cd5da-8424-4922-a7ff-4ecb670a6c0a",
      nombre: "ACHS principal",
      disponibilidad: [
        {
          date: "27/4/2020",
          hourFrom: 10,
          hourTo: 11,
        },
        {
          date: "28/4/2020",
          hourFrom: 12,
          hourTo: 13,
        },
        {
          date: "29/4/2020",
          hourFrom: 15,
          hourTo: 16,
        },
      ],
    },
  ],
};

const createCalendar = () => {
  const oneCenterAvailability = apiResponse.centros[0].disponibilidad;
  const currentWeek = createCurrentWeek();
  const calendar = {};
  currentWeek.forEach((day) => {
    calendar[day] = {};
  });
  const keys = Object.keys(calendar);
  const startHour = {};
  oneCenterAvailability.forEach((availability) => {
    if (keys.includes(availability.date)) {
      startHour[availability.hourFrom] = true;
      calendar[availability.date] = startHour;
    }
  });
  return calendar;
};

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

const createTimeSlots = () => {
  const timeSlotsTable = Array(9)
    .fill(null)
    .map((x) => Array(6).fill("x"));
  const totalHourInColumn = 9;
  for (let hourIndex = 0; hourIndex <= totalHourInColumn - 1; hourIndex++) {
    const hourString = `${hourIndex + totalHourInColumn}:00 - ${
      hourIndex + 10
    }:00`;
    timeSlotsTable[hourIndex][0] = hourString;
  }
  return timeSlotsTable;
};

const CreateHeadersTable = (props) => {
  const { headers } = props;
  const listItems = headers.map((day) => <th key={day}>{day}</th>);
  return (
    <tr>
      <th></th>
      {listItems}
    </tr>
  );
};

const CreateTimeSlots = (props) => {
  const { timeSlots } = props;
  const listItems = timeSlots.map((slot) => (
    <tr key={slot}>
      {slot.map((atDay) => (
        <th key={atDay}>{atDay}</th>
      ))}
    </tr>
  ));
  return listItems;
};

const TableAvailability = () => {
  const [week, setWeek] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    setWeek(createCurrentWeek);
    setTimeSlots(createTimeSlots);
  }, []);

  const tableStyle = {
    border: "1px solid black",
  };

  return (
    <div>
      <table style={tableStyle}>
        <thead>
          <CreateHeadersTable headers={week} />
        </thead>
        <tbody>
          <CreateTimeSlots timeSlots={timeSlots} />
        </tbody>
      </table>
    </div>
  );
};

export default TableAvailability;
