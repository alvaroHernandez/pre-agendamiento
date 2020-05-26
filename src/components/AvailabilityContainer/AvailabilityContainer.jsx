import React from 'react';
import * as appointmentsClient from '../../clients/appointmentsClient';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import TableAvailability from '../TableAvailability/TableAvailability';
import PropTypes from 'prop-types';
import useAuthenticatedFetch from '../../hooks/useAuthenticatedFetch';

const AvailabilityContainer = ({ userId, centerId }) => {
  const { status, data, error } = useAuthenticatedFetch(
    ['appointments', { userId, centerId }],
    appointmentsClient.getForUserAndCenter,
  );

  if (status === 'loading') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return <ErrorMessage message={error.message} />;
  }

  return <TableAvailability appointments={data} />;
};

AvailabilityContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  centerId: PropTypes.number.isRequired,
};

export default AvailabilityContainer;
