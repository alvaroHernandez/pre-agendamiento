import { CORE_HOURS_CENTERS } from '../constants/ServiceConstants';
import hourAvailability from '../data/HourAvailabilityType';
import dayOfTheWeekToString from './dayOfTheWeekToString';

export const createCurrentWeekHeader = () => {
  const currentDay = new Date();
  const firstDayNumber = 1;
  const lastDayNumber = 5;
  const currentWeek = [];
  for (let day = firstDayNumber; day <= lastDayNumber; day++) {
    const dayOfWeek = currentDay.getDate() - currentDay.getDay() + day;
    const date = new Date(currentDay.setDate(dayOfWeek));
    const dateString = `${dayOfTheWeekToString(
      date.getDay(),
    )} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    currentWeek.push(dateString);
  }
  return currentWeek;
};

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

export const createCalendar = (data) => {
  const hoursAvailable = data;
  const currentWeek = createCurrentWeek();
  const calendar = {};
  currentWeek.forEach((day) => {
    calendar[day.toString()] = [];
  });
  const dates = Object.keys(calendar);
  hoursAvailable.forEach((appointment) => {
    if (dates.includes(appointment.date)) {
      calendar[appointment.date].push(appointment);
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
      const availableHoursFromOfDay = calendar[date.toString()];
      if (
        availableHoursFromOfDay instanceof Array &&
        availableHoursFromOfDay.some((e) => e.hour === hour)
      ) {
        const appointment = availableHoursFromOfDay.find(
          (e) => e.hour === hour,
        );
        appointment.type =
          appointment.type === undefined
            ? hourAvailability.USER_APPOINTMENT
            : appointment.type;
        weekHourData.push(appointment);
      } else {
        weekHourData.push({
          type: hourAvailability.AVAILABLE,
          description: '',
        });
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
