export const CORE_HOURS_CENTERS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
];

export const API_CENTER_RESPONSE = {
  appointments: [
    {
      id: 1,
      description: 'Cita de Alvaro',
      date: '11/5/2020',
      hour: '14:00',
      slotId: '202005051400',
      healthcareFacility: 'Mordor',
      type: 'userAppointment',
    },
    {
      id: 2,
      description: 'Dentista',
      date: '12/5/2020',
      hour: '19:00',
      slotId: '202005081624',
      healthcareFacility: 'Providencia',
      type: 'userAppointment',
    },
    {
      id: 3,
      description: '',
      date: '12/5/2020',
      hour: '15:00',
      slotId: '202005081624',
      healthcareFacility: 'Neverland',
      type: 'centerAppointment',
    },
    {
      id: 3,
      description: 'Vacuna Influenza',
      date: '14/5/2020',
      hour: '10:00',
      slotId: '202005081624',
      healthcareFacility: 'Neverland',
      type: 'userAppointment',
    },
  ],
};

export const API_USER_RESPONSE = {
  appointments: [
    {
      id: 1,
      description: 'Cita de Alvaro',
      date: '11/5/2020',
      hour: '15:00',
      slotId: '202005051400',
      healthcareFacility: null,
    },
    {
      id: 2,
      description: 'Dentista',
      date: '12/5/2020',
      hour: '18:00',
      slotId: '202005081624',
      healthcareFacility: null,
    },
  ],
};
