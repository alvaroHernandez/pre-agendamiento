import { CORE_HOURS_CENTERS, API_RESPONSE } from '../constants/ServiceConstants';
import hourAvailability from '../data/HourAvailabilityType';

export const createCurrentWeek = () => {
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

export const createCalendar = () => {
  const oneCenterAvailability = API_RESPONSE.centros[0].disponibilidad;
  const currentWeek = createCurrentWeek();
  const calendar = {};
  currentWeek.forEach((day) => {
    calendar[day] = {};
  });
  const datesOfCalendar = Object.keys(calendar);
  oneCenterAvailability.forEach((availability) => {
    const startHour = [];
    if (datesOfCalendar.includes(availability.date)) {
      startHour.push(availability.hourFrom);
    }
    calendar[availability.date] = startHour;
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
  console.log(calendar);
  console.log(datesOfWeek);
  const rows = [];
  CORE_HOURS_CENTERS.forEach((hour) => {
    const weekHourData = [];
    datesOfWeek.forEach((date) => {
      const availableHoursFromOfDay = calendar[date];
      if (
        availableHoursFromOfDay instanceof Array
          && availableHoursFromOfDay.includes(hour)
      ) {
        weekHourData.push(hourAvailability.AVAILABLE);
      } else {
        weekHourData.push(hourAvailability.NOT_AVAILABLE);
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
  console.log(rows);
  return rows;
}
