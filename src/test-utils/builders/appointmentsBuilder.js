const today = new Date();
//TODO: when we have more functionality in our app we can use test-data-bot and faker
export const userAppointmentBuilder = () => ({
  id: 1,
  description: 'Cita de Alvaro',
  date: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
  time: { hours: 14, minutes: 0 },
  slotId: '202005051400',
  healthcareFacility: null,
  hour: '14:00',
  type: 'userAppointment',
});

export const centerAppointmentOneBuilder = () => ({
  id: 2,
  description: 'Cita centro 2',
  date: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
  time: { hours: 16, minutes: 0 },
  slotId: '202005081624',
  healthcareFacility: null,
  hour: '16:00',
  type: 'centerAppointment',
});

export const centerAppointmentTwoBuilder = () => ({
  id: 3,
  description: 'Cita centro 3',
  date: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
  time: { hours: 16, minutes: 0 },
  slotId: '202005081624',
  healthcareFacility: null,
  hour: '16:00',
  type: 'centerAppointment',
});
