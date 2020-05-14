import React, { useState } from 'react';
import TableAvailability from "../TableAvailability/TableAvailability";
import SimpleListCenters from "../SimpleListCenters/SimpleListCenters";
import Header from "../Header/Header";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "12px",
  },
}));

const Home = () => {
  const [centerActive, setCenterActive] = useState(1);

  const handleActive = (index) => {
    setCenterActive(index);
  };

  const classes = useStyles();
  return (
    <div>
      <Header/>
      <Container className={classes.container}>
        <Grid container direction="row" spacing={2} bgcolor="background.paper">

          <Grid item xs={12} sm={2} bgcolor="grey.300">
            <SimpleListCenters setActive={handleActive} />
          </Grid>

          <Grid item xs={12} sm={10} bgcolor="grey.300">
            <TableAvailability centerId={centerActive} />
          </Grid>

        </Grid>
      </Container>
    </div>
  );
};

export default Home;
