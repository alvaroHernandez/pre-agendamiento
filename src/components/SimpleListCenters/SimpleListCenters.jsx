import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { httpClient } from '../../clients/httpClient';
import PropTypes from 'prop-types';

const API_URL = `${process.env.REACT_APP_API_MANAGEMENT_URL}/healthcarefacilities`;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const SelectedListItem = (props) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [healthFacilities, setHealthFacilities] = useState([]);

  useEffect(() => {
    httpClient(
      API_URL,
      'GET',
      (json) => {
        setHealthFacilities(json);
      },
      () => {
        setHealthFacilities([]);
      },
    );
  }, []);

  const handleListItemClick = (event, index, healthFacility) => {
    setSelectedIndex(index);
    props.setActive(healthFacility.id);
  };

  return (
    <div className={classes.root}>
      <List component='nav' aria-label='main mailbox folders'>
        {healthFacilities.map((healthFacility, i) => (
          <ListItem
            key={i}
            button
            selected={selectedIndex === i}
            onClick={(event) => handleListItemClick(event, i, healthFacility)}
          >
            <ListItemText primary={healthFacility.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

SelectedListItem.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export default SelectedListItem;
