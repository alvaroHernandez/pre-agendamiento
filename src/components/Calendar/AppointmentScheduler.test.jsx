import React from 'react';
import { render, screen } from '../../test-utils/render';
import AppointmentScheduler from './AppointmentScheduler';
import { getAll } from '../../clients/centersClient';
import { getForUserAndCenter } from '../../clients/appointmentsClient';
import { waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import {
  centerAppointmentOneBuilder,
  centerAppointmentTwoBuilder,
  userAppointmentBuilder,
} from '../../test-utils/builders/appointmentsBuilder';
import { centerBuilder } from '../../test-utils/builders/centerBuilder';

jest.mock('../../clients/centersClient');
getAll.mockResolvedValue(centerBuilder());

jest.mock('../../clients/appointmentsClient');

test('render appointments for a selected center and user', async () => {
  const userAppointment = userAppointmentBuilder();
  const centerAppointmentOne = centerAppointmentOneBuilder();
  const centerAppointmentTwo = centerAppointmentTwoBuilder();

  when(getForUserAndCenter)
    .calledWith('appointments', { centerId: 2, userId: 'testUserId' })
    .mockResolvedValue([userAppointment, centerAppointmentOne]);

  when(getForUserAndCenter)
    .calledWith('appointments', { centerId: 3, userId: 'testUserId' })
    .mockResolvedValue([userAppointment, centerAppointmentTwo]);

  await render(<AppointmentScheduler />);
  await waitForElementToBeRemoved(() => screen.getAllByText(/Loading/i));
  expect(await screen.findByText('Sillicon Valley')).toBeInTheDocument();
  expect(
    await screen.findByText(userAppointment.description),
  ).toBeInTheDocument();
  expect(
    await screen.findByText(centerAppointmentOne.description),
  ).toBeInTheDocument();

  const secondCenter = await screen.findByText('Talca');
  userEvent.click(secondCenter);
  expect(
    await screen.findByText(userAppointment.description),
  ).toBeInTheDocument();
  expect(
    await screen.findByText(centerAppointmentTwo.description),
  ).toBeInTheDocument();
});
