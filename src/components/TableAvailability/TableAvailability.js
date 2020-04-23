import React, { useEffect, useState } from "react";

const TableAvailability = (props) => {
  const [availabilityItems, setAvailabilityItems] = useState([]);
  const [centerName, setCenterName] = useState([]);
  const [week, setWeek] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    apiCall();
    setWeek(createCurrentWeek);
    setTimeSlots(createTimeSlots);
    setCalendar(createCalendar);
  }, []);

  const apiCall = () => {
    const obj = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "bearer string",
      },
    };
    fetch("http://52.141.211.84/healthcarefacilities/", obj)
      .then((response) => response.json())
      .then((json) => {
        setCenterName(json.centros[0].nombre);
        setAvailabilityItems(json.centros[0].disponibilidad);
      })
      .catch((error) => {
        console.log(error);
        setAvailabilityItems([]);
      });
  };

  const content = () => {
    const auth = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "bearer string",
      },
    };
    let obj;
    fetch("http://52.141.211.84/healthcarefacilities/", auth)
      .then((res) => res.json())
      .then((data) => (obj = data))
      .then(() => console.log(obj));
  };

  async function fetchApi() {
    const auth = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "bearer string",
      },
    };
    try {
      const response = await fetch(
        "http://52.141.211.84/healthcarefacilities/",
        auth
      );
      const availability = await response.json();
      return availability;
    } catch (error) {
      console.error(error);
    }
  }

  async function createCalendar() {
    const apiResponse = await fetchApi();
    // const oneCenterAvailability = apiResponse.centros[0].disponibilidad;
    const oneCenterAvailability = ["this", "is", "example", "delete"];
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

    console.log(calendar);
    return calendar;
  }

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

  const tableStyle = {
    border: "1px solid black",
  };

  return (
    <div>
      <p>Horas disponibles</p>
      <p>{centerName}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th />
            {week.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((workHourRow) => (
            <tr key={workHourRow}>
              {workHourRow.map((atDay) => (
                <th key={atDay}>{atDay}</th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAvailability;
