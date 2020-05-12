import {
  CORE_HOURS_CENTERS,
  API_USER_RESPONSE,
  API_CENTER_RESPONSE
} from '../constants/ServiceConstants';
import hourAvailability from '../data/HourAvailabilityType';

export const createCurrentWeek = () => {
  const currentDay = new Date();
  const firstDayNumber = 1;
  const lastDayNumber = 5;
  const currentWeek = [];
  for (let day = firstDayNumber; day <= lastDayNumber; day++) {
    const dayOfWeek = currentDay.getDate() - currentDay.getDay() + day;
    const date = new Date(currentDay.setDate(dayOfWeek));
    const dateString = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    currentWeek.push(dateString);
  }
  return currentWeek;
};

export function createCenterCalendar () {
  return createCalendar(API_CENTER_RESPONSE.appointments);
}
export function createUserCalendar () {
  return createCalendar(API_USER_RESPONSE.appointments);

}

export const createCalendar = (data) => {
  const hoursAvailable = data;
  const currentWeek = createCurrentWeek();
  const calendar = {};
  currentWeek.forEach((day) => {
    calendar[day] = [];
  });
  const dates = Object.keys(calendar);
  hoursAvailable.forEach((appointment) => {
    if (dates.includes(appointment.date)) {
      calendar[appointment.date].push(appointment.time);
    }
  });
  return calendar;
};

export function createData(hour, monday, tuesday, wednesday, thursday, friday) {
  return {
    hour,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
  };
}

export function createCalendarRow(calendar, datesOfWeek) {
  const rows = [];
  CORE_HOURS_CENTERS.forEach((hour) => {
    const weekHourData = [];
    datesOfWeek.forEach((date) => {
      const availableHoursFromOfDay = calendar[date];
      if (
        availableHoursFromOfDay instanceof Array
          && availableHoursFromOfDay.includes(hour)
      ) {
        weekHourData.push(hourAvailability.NOT_AVAILABLE);
      } else {
        weekHourData.push(hourAvailability.AVAILABLE);

      }
    });
    rows.push(
      createData(
        hour,
        weekHourData[0],
        weekHourData[1],
        weekHourData[2],
        weekHourData[3],
        weekHourData[4],
      ),
    );
  });
  return rows;
}
