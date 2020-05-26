import React from 'react';
import { render, screen } from '../../test-utils/render';
import AppointmentScheduler from './AppointmentScheduler';

import { getAll } from '../../clients/centersClient';
import { getForUserAndCenter } from '../../clients/appointmentsClient';
import { waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('../../clients/centersClient');
getAll.mockResolvedValue([
  {
    id: 2,
    name: 'Sillicon Valley',
    address: 'Steve Jobs 1500',
    workingHoursFrom: 0,
    workingHoursTo: 0,
  },
  {
    id: 3,
    name: 'Talca',
    address: 'Calle 500',
    workingHoursFrom: 0,
    workingHoursTo: 0,
  },
]);

const today = new Date();
jest.mock('../../clients/appointmentsClient');
getForUserAndCenter.mockImplementation((key, { userId, centerId }) => {
  const userAppointment = {
    id: 1,
    description: 'Cita de Alvaro',
    date: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
    time: { hours: 14, minutes: 0 },
    slotId: '202005051400',
    healthcareFacility: null,
    hour: '14:00',
    type: 'userAppointment',
  };

  if (centerId === 2) {
    return [
      userAppointment,
      {
        id: 2,
        description: 'Cita centro 2',
        date: `${today.getDate()}/${
          today.getMonth() + 1
        }/${today.getFullYear()}`,
        time: { hours: 16, minutes: 0 },
        slotId: '202005081624',
        healthcareFacility: null,
        hour: '16:00',
        type: 'centerAppointment',
      },
    ];
  } else if (centerId === 3) {
    return [
      userAppointment,
      {
        id: 3,
        description: 'Cita centro 3',
        date: `${today.getDate()}/${
          today.getMonth() + 1
        }/${today.getFullYear()}`,
        time: { hours: 16, minutes: 0 },
        slotId: '202005081624',
        healthcareFacility: null,
        hour: '16:00',
        type: 'centerAppointment',
      },
    ];
  }
});

test('render appointments for a selected center and user', async () => {
  await render(<AppointmentScheduler />);
  await waitForElementToBeRemoved(() => screen.getAllByText(/Loading/i));
  expect(await screen.findByText('Sillicon Valley')).toBeInTheDocument();
  expect(await screen.findByText('Cita de Alvaro')).toBeInTheDocument();
  expect(await screen.findByText('Cita centro 2')).toBeInTheDocument();

  const secondCenter = await screen.findByText('Talca');
  userEvent.click(secondCenter);
  expect(await screen.findByText('Cita de Alvaro')).toBeInTheDocument();
  expect(await screen.findByText('Cita centro 3')).toBeInTheDocument();
});

// test('render appointments for given user');
