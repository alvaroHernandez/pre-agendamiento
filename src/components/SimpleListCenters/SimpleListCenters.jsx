import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import useAuthenticatedFetch from '../../hooks/useAuthenticatedFetch';
import * as centerClient from '../../clients/centersClient';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const SelectedListItem = (props) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { status, data, error } = useAuthenticatedFetch(
    ['centers'],
    centerClient.getAll,
  );

  const handleListItemClick = (event, index, healthFacility) => {
    setSelectedIndex(index);
    props.setActive(healthFacility.id);
  };

  if (status === 'loading') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className={classes.root}>
      <List component='nav' aria-label='main mailbox folders'>
        {data.map((healthFacility, i) => (
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
