import React, { useState } from 'react';
import TableAvailability from "../TableAvailability/TableAvailability";
import SimpleListCenters from "../SimpleListCenters/SimpleListCenters";
import Header from "../Header/Header";
import Box from '@material-ui/core/Box';

const Home = () => {
  const [centerActive, setCenterActive] = useState([]);

  const handleActive = (index) => {
    setCenterActive(index);
  };

  return (
    <div>
      <Header/>
      <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
        <Box p={1} bgcolor="grey.300">
          <SimpleListCenters setActive={handleActive}/>
        </Box>
        <Box p={1} bgcolor="grey.300">
          <TableAvailability centerId={centerActive}/>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
