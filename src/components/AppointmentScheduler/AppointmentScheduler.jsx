import Grid from '@material-ui/core/Grid';
import SimpleListCenters from '../SimpleListCenters/SimpleListCenters';
import React, { useState } from 'react';
import AvailabilityContainer from '../AvailabilityContainer/AvailabilityContainer';
import { useAuth } from '../../context/AuthProvider';

const AppointmentScheduler = () => {
  const { authenticatedUser } = useAuth();

  const [centerActive, setCenterActive] = useState(2);

  const handleActive = (index) => {
    setCenterActive(index);
  };

  return (
    <Grid container direction='row' spacing={2} bgcolor='background.paper'>
      <Grid item xs={12} sm={2} bgcolor='grey.300'>
        <SimpleListCenters setActive={handleActive} />
      </Grid>

      <Grid item xs={12} sm={10} bgcolor='grey.300'>
        <AvailabilityContainer
          userId={authenticatedUser.userId}
          centerId={centerActive}
        />
      </Grid>
    </Grid>
  );
};

export default AppointmentScheduler;
